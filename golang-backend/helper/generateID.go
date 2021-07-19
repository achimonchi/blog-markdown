package helper

import (
	"strconv"
	"time"
)

func GenerateID() string {
	t := time.Now()
	tUnixMicro := int64(time.Nanosecond) * t.UnixNano() / int64(time.Microsecond)

	tString := strconv.FormatInt(tUnixMicro, 10)
	return tString
}
