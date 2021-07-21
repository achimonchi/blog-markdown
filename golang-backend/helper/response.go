package helper

type SuccessFindAll struct {
	Status int         `json:"status"`
	Data   interface{} `json:"data"`
	Limit  int         `json:"limit"`
	Offset int         `json:"offset"`
	Count  int         `json:"count"`
}

type SuccessFindOne struct {
	Status int         `json:"status"`
	Data   interface{} `json:"data"`
}

type SuccessCreated struct {
	Status  int         `json:"status"`
	Data    interface{} `json:"data"`
	Message string      `json:"message"`
}

type ErrorRequest struct {
	Status  int    `json:"status"`
	Message string `json:"message"`
}

var MessageCreatedSuccess string = "created successful !"
