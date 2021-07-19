package repository

import "github.com/blog-markdown/src/courses/entity"

type CourseRepositoy interface {
	FindAllWithLimit(limit int, offset int) (*[]entity.Course, error)
	FindAll() (*[]entity.Course, error)

	Save(*entity.Course) error
}
