package config

import (
	"database/sql"
	"fmt"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

func GetPostgresDB() (*sql.DB, error) {
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Println("No env !")
		return nil, err
	}

	host := os.Getenv("COURSE_POSTGRES_HOST")
	port := os.Getenv("COURSE_POSTGRES_PORT")
	user := os.Getenv("COURSE_POSTGRES_USER")
	pass := os.Getenv("COURSE_POSTGRES_PASS")
	dbname := os.Getenv("COURSE_POSTGRES_DBNAME")

	desc := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", host, port, user, pass, dbname)
	fmt.Println(desc)
	db, err := createConnection(desc)
	if err != nil {

		return nil, err
	}

	return db, nil

}

func createConnection(desc string) (*sql.DB, error) {
	db, err := sql.Open("postgres", desc)
	if err != nil {
		return nil, err
	}

	db.SetMaxIdleConns(10)
	db.SetMaxOpenConns(10)

	return db, nil
}

func GetConnection() *sql.DB {
	db, err := GetPostgresDB()
	if err != nil {
		panic(err)
	}

	err = db.Ping()

	if err != nil {
		panic(err)
	}

	return db
}
