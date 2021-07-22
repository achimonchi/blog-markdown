package main

import (
	"fmt"
	"os"

	"github.com/blog-markdown/routes"
	"github.com/blog-markdown/src/courses/controller"
	"github.com/joho/godotenv"
)

var (
	httpRouter       routes.Router               = routes.NewMuxRouter()
	courseController controller.CourseController = controller.NewCourseController()
)

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Println("No Env")
	}

	port := os.Getenv("APP_PORT")
	portString := fmt.Sprintf(":%v", port)

	httpRouter.GET("/", courseController.GetCourses)
	httpRouter.POST("/", courseController.AddNewCourse)
	httpRouter.POST("/title", courseController.GetCoursesByTitle)

	httpRouter.SERVE(portString)
}
