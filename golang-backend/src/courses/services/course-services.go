package services

import (
	"github.com/blog-markdown/src/courses/entity"
	"github.com/blog-markdown/src/courses/repository"
)

type CourseService interface {
	GetAllCoursesByLimit(limit int, offset int) (*[]entity.Course, error)
	GetAllCourses() (*[]entity.Course, error)

	GetAllCoursesByTitle(title string) (*entity.Course, error)

	AddCourse(course *entity.Course) error
}

type courseService struct{}

func NewCourseService() *courseService {
	return &courseService{}
}

var (
	courseRepo repository.CourseRepositoy = repository.NewPostgresCourseRespository()
)

func (*courseService) GetAllCoursesByLimit(limit int, offset int) (*[]entity.Course, error) {
	return courseRepo.FindAllWithLimit(limit, offset)
}

func (*courseService) GetAllCourses() (*[]entity.Course, error) {
	return courseRepo.FindAll()
}

func (*courseService) GetAllCoursesByTitle(title string) (*entity.Course, error) {
	return courseRepo.FindByTitle(title)
}

func (*courseService) AddCourse(course *entity.Course) error {
	return courseRepo.Save(course)
}
