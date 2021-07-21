package kafka

import (
	"fmt"
	"time"

	"github.com/Shopify/sarama"
)

func ConnectionProducer() (sarama.SyncProducer, error) {
	kafkaConfig := GetConfig("", "")

	producers, err := sarama.NewSyncProducer([]string{"localhost:29092"}, kafkaConfig)
	if err != nil {
		fmt.Printf("Unable to create kafka producer got error %v", err)
		return nil, err
	}

	fmt.Println("Success create kafka sync-producer")
	return producers, nil
}

func ConnectionConsumer() (sarama.Consumer, error) {
	kafkaConfig := GetConfig("", "")

	consumers, err := sarama.NewConsumer([]string{"localhost:29092"}, kafkaConfig)
	if err != nil {
		fmt.Printf("Unable to create kafka consumer got error %v", err)
		return nil, err
	}

	fmt.Println("Success create kafka sync-consumer")
	return consumers, nil
}

func GetConfig(username, password string) *sarama.Config {
	kafkaConfig := sarama.NewConfig()

	kafkaConfig.Producer.Return.Successes = true
	kafkaConfig.Net.WriteTimeout = 5 * time.Second
	kafkaConfig.Producer.Retry.Max = 0

	if username != "" {
		kafkaConfig.Net.SASL.Enable = true
		kafkaConfig.Net.SASL.User = username
		kafkaConfig.Net.SASL.Password = password
	}

	return kafkaConfig
}
