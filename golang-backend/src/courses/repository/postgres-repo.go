package repository

import (
	"errors"
	"fmt"

	"github.com/blog-markdown/src/courses/config"
	"github.com/blog-markdown/src/courses/entity"
)

type courseRepo struct{}

func NewPostgresCourseRespository() CourseRepositoy {
	return &courseRepo{}
}

func (*courseRepo) FindAllWithLimit(limit int, offset int) (*[]entity.Course, error) {
	db := config.GetConnection()

	if db == nil {
		fmt.Println(db)
		return nil, errors.New("connection lost")
	}

	query := `
		SELECT
			id, course_title, course_level,
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
			&course.ID, &course.CourseTitle, &course.CourseLevel,
			&course.CourseType, &course.CourseDesc, &course.CourseTags,
			&course.CoursePrice, &course.CreatedAt, &course.UpdatedAt,
		)

		if err != nil {
			return nil, err
		}

		courses = append(courses, course)
	}

	return &courses, nil

}

func (*courseRepo) FindAll() (*[]entity.Course, error) {
	db := config.GetConnection()

	if db == nil {
		return nil, errors.New("connection lost")
	}

	query := `
		SELECT
			id, course_title, course_level,
			course_type, course_desc, course_tags,
			course_price, created_at, updated_at
		FROM courses
	`
	stmt, err := db.Query(query)

	if err != nil {
		return nil, err
	}

	defer stmt.Close()
	defer db.Close()

	var courses []entity.Course
	for stmt.Next() {
		var course entity.Course
		err = stmt.Scan(
			&course.ID, &course.CourseTitle,
			&course.CourseLevel, &course.CourseType,
			&course.CourseDesc, &course.CourseTags,
			&course.CoursePrice, &course.CreatedAt,
			&course.UpdatedAt,
		)

		if err != nil {
			return nil, err
		}

		courses = append(courses, course)
	}

	return &courses, nil
}

func (*courseRepo) Save(course *entity.Course) error {
	db := config.GetConnection()

	query := `
		INSERT INTO courses (
			id, course_title, course_level,
			course_type, course_desc, course_tags,
			course_price, created_at, updated_at
		) VALUES (
			$1, $2, $3, $4, $5, $6, $7, $8, $9
		)
	`

	stmt, err := db.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()
	defer db.Close()

	_, err = stmt.Exec(
		course.ID, course.CourseTitle,
		course.CourseLevel, course.CourseType,
		course.CourseDesc, course.CourseTags,
		course.CoursePrice, course.CreatedAt,
		course.UpdatedAt,
	)

	if err != nil {
		return err
	}

	return nil

}
