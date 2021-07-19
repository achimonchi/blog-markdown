package main

import (
	"encoding/json"
	"net/http"

	"github.com/blog-markdown/helper"
	"github.com/blog-markdown/src/blog/routes"
)

var (
	httpRouter routes.Router = routes.NewMuxRouter()
)

func main() {
	httpRouter.GET("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-type", "application/json")

		result := helper.SuccessFindAll{}
		json.NewEncoder(w).Encode(result)
	})

	httpRouter.SERVE(":5000")
}
