package main

import (
	"fmt"

	"github.com/blog-markdown/kafka"
	"github.com/blog-markdown/kafka/producer"
	"github.com/blog-markdown/src/courses/controller"
	"github.com/blog-markdown/src/courses/routes"
)

var (
	httpRouter       routes.Router               = routes.NewMuxRouter()
	courseController controller.CourseController = controller.NewCourseController()
)

func main() {
	// httpRouter.GET("/", courseController.GetCourses)
	// httpRouter.POST("/", courseController.AddNewCourse)
	// httpRouter.POST("/title", courseController.GetCoursesByTitle)

	// test kafka
	producers, _ := kafka.ConnectionProducer()

	defer producers.Close()

	kafka := &producer.KafkaProducer{
		Producer: producers,
	}

	for i := 20; i <= 100; i++ {
		msg := fmt.Sprintf("message number %v", i)
		err := kafka.SendMessage("test_topic", msg)
		if err != nil {
			panic(err)
		}
	}

	// httpRouter.SERVE(":4000")
}
