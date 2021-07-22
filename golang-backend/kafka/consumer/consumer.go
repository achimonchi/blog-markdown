package consumer

import (
	"fmt"
	"os"

	"github.com/NooBeeID/go-logging/colors"
	"github.com/NooBeeID/go-logging/messages"
	"github.com/Shopify/sarama"
	"github.com/blog-markdown/helper"
)

type KafkaConsumer struct {
	Consumer sarama.Consumer
}

func (c *KafkaConsumer) Consume(topics []string, signals chan os.Signal) {
	chanMessage := make(chan *sarama.ConsumerMessage, 256)
	for _, topic := range topics {
		partitionList, err := c.Consumer.Partitions(topic)
		if err != nil {
			fmt.Printf("Unable to get partition got error %v\n", err)
			continue
		}
		for _, partition := range partitionList {
			go consumeMessage(c.Consumer, topic, partition, chanMessage)
		}
	}
ConsumerLoop:
	for {
		select {
		case msg := <-chanMessage:
			switch msg.Topic {
			case helper.TOPIC_GET:
				messages.NewLog("GET", colors.White, string(msg.Value))
			case helper.TOPIC_POST:
				messages.NewLog("POST", colors.Cyan, string(msg.Value))
			case helper.TOPIC_PUT:
				messages.NewLog("PUT", colors.Green, string(msg.Value))
			case helper.TOPIC_DELETE:
				messages.NewLog("DELETE", colors.Purple, string(msg.Value))
			case helper.TOPIC_ERROR_GET:
				messages.NewLog("GET", colors.Red, string(msg.Value))
			case helper.TOPIC_ERROR_POST:
				messages.NewLog("POST", colors.Red, string(msg.Value))
			case helper.TOPIC_ERROR_PUT:
				messages.NewLog("PUT", colors.Red, string(msg.Value))
			case helper.TOPIC_ERROR_DELETE:
				messages.NewLog("DELETE", colors.Red, string(msg.Value))
			default:
				messages.SysLog("Default ...")
			}
			// fmt.Printf("New Message from kafka, message: %v\n", string(msg.Value))
		case sig := <-signals:
			if sig == os.Interrupt {
				break ConsumerLoop
			}
		}
	}
}

func consumeMessage(consumer sarama.Consumer, topic string, partition int32, c chan *sarama.ConsumerMessage) {
	msg, err := consumer.ConsumePartition(topic, partition, sarama.OffsetNewest)
	if err != nil {
		fmt.Printf("Unable to consume partition %v got error %v\n", partition, err)
		return
	}

	defer func() {
		if err := msg.Close(); err != nil {
			fmt.Printf("Unable to close partition %v: %v\n", partition, err)
		}
	}()

	for {
		msg := <-msg.Messages()
		c <- msg
	}

}
