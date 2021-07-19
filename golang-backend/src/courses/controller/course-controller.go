package controller

import (
	"encoding/json"
	"net/http"

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

	courses, err := courseService.GetAllCourses(20, 0)

	if err != nil {

	}

	successResp := helper.SuccessFindAll{
		Data:   courses,
		Status: 200,
		Limit:  20,
		Offset: 0,
	}
	json.NewEncoder(resp).Encode(successResp)
}

func (*courseController) AddNewCourse(resp http.ResponseWriter, req *http.Request) {

}
