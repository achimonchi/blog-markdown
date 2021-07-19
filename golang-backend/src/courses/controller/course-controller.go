package controller

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/blog-markdown/helper"
	"github.com/blog-markdown/src/courses/services"
)

type courseController struct{}

type CourseController interface {
	GetCourses(resp http.ResponseWriter, req *http.Request)
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
		fmt.Println(err)

	}
	count, err := courseService.GetAllCourses()

	if err != nil {

	}
	fmt.Println(count)

	successResp := helper.SuccessFindAll{
		Data:   courses,
		Status: 200,
		Limit:  20,
		Offset: 0,
		// Count:  len(*count),
	}
	json.NewEncoder(resp).Encode(successResp)
}

func (*courseController) AddNewCourse(resp http.ResponseWriter, req *http.Request) {

}
