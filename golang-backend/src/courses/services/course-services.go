package services

import (
	"github.com/blog-markdown/src/courses/entity"
	"github.com/blog-markdown/src/courses/repository"
)

type CourseService interface {
	GetAllCourses(limit int, offset int) (*[]entity.Course, error)
}

type courseService struct{}

func NewCourseService() *courseService {
	return &courseService{}
}

var (
	courseRepo repository.CourseRepositoy = repository.NewPostgresCourseRespository()
)

func (*courseService) GetAllCourses(limit int, offset int) (*[]entity.Course, error) {
	return courseRepo.FindAll(limit, offset)
}
