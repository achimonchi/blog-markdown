package controller

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/blog-markdown/helper"
	"github.com/blog-markdown/src/courses/entity"
	"github.com/blog-markdown/src/courses/services"
)

type courseController struct{}

type CourseController interface {
	GetCourses(resp http.ResponseWriter, req *http.Request)
	GetCoursesByTitle(resp http.ResponseWriter, req *http.Request)

	AddNewCourse(resp http.ResponseWriter, req *http.Request)
}

func NewCourseController() *courseController {
	return &courseController{}
}

var (
	courseService services.CourseService = services.NewCourseService()
)

func (*courseController) GetCourses(resp http.ResponseWriter, req *http.Request) {
	resp.Header().Set("Content-type", "application/json")
	// resp.Header().Set("Access-Control-Allow-Origin", "*")
	query := req.URL.Query()

	limit := query.Get("limit")
	page := query.Get("page")

	limitInt, err := strconv.Atoi(limit)
	if err != nil {
		limitInt = 5
	}

	pageInt, err := strconv.Atoi(page)
	if err != nil {
		pageInt = 0
	}

	courses, err := courseService.GetAllCoursesByLimit(limitInt, pageInt)

	if err != nil {
		errorReq := helper.ErrorRequest{
			Status:  400,
			Message: err.Error(),
		}
		resp.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(resp).Encode(errorReq)
		return
	}
	count, err := courseService.GetAllCourses()

	if err != nil {
		errorReq := helper.ErrorRequest{
			Status:  400,
			Message: err.Error(),
		}
		resp.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(resp).Encode(errorReq)
		return
	}

	successResp := helper.SuccessFindAll{
		Data:   courses,
		Status: 200,
		Limit:  limitInt,
		Offset: pageInt,
		Count:  len(*count),
	}
	json.NewEncoder(resp).Encode(successResp)
}

func (*courseController) GetCoursesByTitle(resp http.ResponseWriter, req *http.Request) {
	resp.Header().Set("Content-type", "application/json")
	var title entity.Course

	err := json.NewDecoder(req.Body).Decode(&title)
	if err != nil {
		errorReq := helper.ErrorRequest{
			Status:  400,
			Message: err.Error(),
		}
		resp.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(resp).Encode(errorReq)
		return
	}

	course, err := courseService.GetAllCoursesByTitle(title.CourseTitle)

	if err != nil {
		errorReq := helper.ErrorRequest{
			Status:  400,
			Message: err.Error(),
		}
		resp.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(resp).Encode(errorReq)
		return
	}

	data := helper.SuccessFindOne{
		Status: 200,
		Data:   course,
	}
	resp.WriteHeader(data.Status)
	json.NewEncoder(resp).Encode(data)
}

func (*courseController) AddNewCourse(resp http.ResponseWriter, req *http.Request) {
	resp.Header().Set("Content-type", "application/json")

	course := entity.NewCourse()

	err := json.NewDecoder(req.Body).Decode(&course)

	if err != nil {
		errorReq := helper.ErrorRequest{
			Status:  400,
			Message: err.Error(),
		}
		resp.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(resp).Encode(errorReq)
		return
	}

	err = courseService.AddCourse(course)
	if err != nil {
		errorReq := helper.ErrorRequest{
			Status:  400,
			Message: err.Error(),
		}
		resp.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(resp).Encode(errorReq)
		return
	}

	data := helper.SuccessCreated{
		Status:  http.StatusCreated,
		Data:    course,
		Message: helper.MessageCreatedSuccess,
	}
	resp.WriteHeader(http.StatusCreated)
	json.NewEncoder(resp).Encode(data)
}
