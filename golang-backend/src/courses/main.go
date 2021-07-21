package main

import (
	"github.com/blog-markdown/src/courses/controller"
	"github.com/blog-markdown/src/courses/routes"
)

var (
	httpRouter       routes.Router               = routes.NewMuxRouter()
	courseController controller.CourseController = controller.NewCourseController()
)

func main() {
	httpRouter.GET("/", courseController.GetCourses)
	httpRouter.POST("/", courseController.AddNewCourse)
	httpRouter.POST("/title", courseController.GetCoursesByTitle)

	httpRouter.SERVE(":4000")
}
