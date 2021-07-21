package producer

import (
	"testing"

	"github.com/blog-markdown/kafka"
)

func TestSendMessage(t *testing.T) {
	t.Run("Send Message OK", func(t *testing.T) {
		// membuat producer mock
		mockedProducer, _ := kafka.ConnectionProducer()
		kafka := &KafkaProducer{
			Producer: mockedProducer,
		}
		defer mockedProducer.Close()

		msg := "Message 1"

		err := kafka.SendMessage("test_topic", msg)
		if err != nil {
			t.Errorf("Send message should not be error but have: %v", err)
		}
	})
}
