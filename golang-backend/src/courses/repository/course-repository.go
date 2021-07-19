package repository

import "github.com/blog-markdown/src/courses/entity"

type CourseRepositoy interface {
	FindAll(limit int, offset int) (*[]entity.Course, error)
}
