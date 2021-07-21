package main

import (
	"os"

	"github.com/blog-markdown/kafka"
	"github.com/blog-markdown/kafka/consumer"
	"github.com/blog-markdown/src/blog/routes"
)

var (
	httpRouter routes.Router = routes.NewMuxRouter()
)

func main() {
	// httpRouter.GET("/", func(w http.ResponseWriter, r *http.Request) {
	// 	w.Header().Set("Content-type", "application/json")

	// 	result := helper.SuccessFindAll{}
	// 	json.NewEncoder(w).Encode(result)
	// })

	// httpRouter.SERVE(":5000")

	// test consume
	consumers, _ := kafka.ConnectionConsumer()

	defer consumers.Close()

	kafkaConsumer := &consumer.KafkaConsumer{
		Consumer: consumers,
	}

	signals := make(chan os.Signal, 1)
	kafkaConsumer.Consume([]string{"test_topic"}, signals)

}
