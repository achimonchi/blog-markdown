package main

import (
	"fmt"
	"os"

	"github.com/blog-markdown/routes"
	"github.com/joho/godotenv"
)

var (
	httpRouter routes.Router = routes.NewMuxRouter()
)

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Println("No Env")
	}

	port := os.Getenv("APP_PORT")
	portString := fmt.Sprintf(":%v", port)

	httpRouter.SERVE(portString)

}
