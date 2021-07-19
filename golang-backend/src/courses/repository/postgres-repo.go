package repository

import (
	"errors"

	"github.com/blog-markdown/src/courses/config"
	"github.com/blog-markdown/src/courses/entity"
)

type courseRepo struct{}

func NewPostgresCourseRespository() CourseRepositoy {
	return &courseRepo{}
}

func (*courseRepo) FindAll(limit int, offset int) (*[]entity.Course, error) {
	db := config.GetConnection()

	if db != nil {
		return nil, errors.New("Connection Lost !")
	}

	query := `
		SELECT
			id, course_title, course_level
			course_type, course_desc, course_tags,
			course_price, created_at, updated_at
		FROM courses
		LIMIT $1
		OFFSET $2
	`
	stmt, err := db.Prepare(query)

	if err != nil {
		return nil, err
	}

	defer stmt.Close()
	defer db.Close()

	rows, err := stmt.Query(limit, offset)
	if err != nil {
		return nil, err
	}

	var courses []entity.Course
	for rows.Next() {
		var course entity.Course
		err = rows.Scan(
			&course.ID, &course.CourseTitle,
			&course.CourseLevel, &course.CourseType,
			&course.CourseDesc, &course.CourseTags,
			&course.CoursePrice, &course.CreatedAt,
		)

		if err != nil {
			return nil, err
		}

		courses = append(courses, course)
	}

	return &courses, nil

}
