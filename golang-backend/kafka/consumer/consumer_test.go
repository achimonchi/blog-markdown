package consumer

import (
	"testing"

	"github.com/Shopify/sarama/mocks"
)

func TestConsumer(t *testing.T) {
	consumers := mocks.NewConsumer(t, nil)

	defer func() {
		if err := consumers.Close(); err != nil {
			t.Error(err)
		}
	}()

	consumers.SetTopicMetadata(map[string][]int32{
		"test_topic": {0},
	})

	// kafka := &consumers
}
