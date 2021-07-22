package main

import (
	"fmt"
	"os"

	"github.com/blog-markdown/helper"
	"github.com/blog-markdown/kafka"
	"github.com/blog-markdown/kafka/consumer"
)

func main() {
	consumers, _ := kafka.ConnectionConsumer()

	defer consumers.Close()
	fmt.Println("Logging server ready !")

	kafkaConsumer := &consumer.KafkaConsumer{
		Consumer: consumers,
	}

	signal := make(chan os.Signal, 1)

	kafkaConsumer.Consume([]string{
		helper.TOPIC_GET,
		helper.TOPIC_ERROR_GET,
		helper.TOPIC_POST,
		helper.TOPIC_ERROR_POST,
		helper.TOPIC_PUT,
		helper.TOPIC_ERROR_PUT,
		helper.TOPIC_DELETE,
		helper.TOPIC_ERROR_DELETE,
	}, signal)

}
