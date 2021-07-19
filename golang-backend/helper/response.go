package helper

type SuccessFindAll struct {
	Status int         `json:"status"`
	Data   interface{} `json:"data"`
	Limit  int         `json:"limit"`
	Offset int         `json:"offset"`
}
