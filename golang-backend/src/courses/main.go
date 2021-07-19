package main

import (
	"github.com/blog-markdown/middleware"
	"github.com/blog-markdown/src/courses/controller"
	"github.com/blog-markdown/src/courses/routes"
)

var (
	httpRouter       routes.Router               = routes.NewMuxRouter()
	courseController controller.CourseController = controller.NewCourseController()
)

func main() {
	httpRouter.GET("/", middleware.Cors(courseController.GetCourses))
	httpRouter.POST("/", courseController.AddNewCourse)

	httpRouter.SERVE(":4000")
}
