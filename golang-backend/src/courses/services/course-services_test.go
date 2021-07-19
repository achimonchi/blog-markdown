package services

import (
	"fmt"
	"testing"

	"github.com/blog-markdown/src/courses/repository"
)

var (
	testCourse repository.CourseRepositoy = repository.NewPostgresCourseRespository()
)

func TestGetAllCourseByLimit(t *testing.T) {
	data, _ := testCourse.FindAll()
	fmt.Println(data)
}
