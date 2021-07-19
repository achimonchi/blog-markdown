package entity

import (
	"encoding/json"
	"time"

	"github.com/blog-markdown/helper"
)

type Course struct {
	ID          string          `json:"id"`
	CourseTitle string          `json:"course_title"`
	CourseLevel string          `json:"course_level"`
	CourseType  string          `json:"course_type"`
	CourseDesc  string          `json:"course_desc"`
	CourseTags  json.RawMessage `json:"course_tags"`
	CoursePrice int             `json:"course_price"`
	CreatedAt   time.Time       `json:"created_at"`
	UpdatedAt   time.Time       `json:"updated_at"`
}

func NewCourse() *Course {
	return &Course{
		ID:        helper.GenerateID(),
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}
}
