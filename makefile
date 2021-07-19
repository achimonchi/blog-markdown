install-docker:
	sh scripts/apps/ubuntu/docker.sh

install-docker-compose:
	sh scripts/apps/ubuntu/docker-compose.sh

install-migrate:
	sh scripts/apps/ubuntu/migrate.sh

install-all-apps: install-docker install-docker-compose install-migrate

install-migrate-mac:
	sh scripts/apps/macos/migrate.sh

migrate-course-up:
	migrate -path ./cafeservices/migration/ -database "postgresql://cafeservices-user:cafeservices-pass@localhost:10100/cafeservices?sslmode=disable" -verbose up


migrate-create:
	migrate create -ext sql -dir ./migration/$(services) -seq init_schema

migrate-up-courses:
	migrate -path migration/courses/ -database "postgresql://course-user:course-pass@localhost:10100/course-services?sslmode=disable" -verbose up

migrate-down-courses:
	migrate -path migration/courses/ -database "postgresql://course-user:course-pass@localhost:10100/course-services?sslmode=disable" -verbose down -all

migrate-up: migrate-up-coruses

migrate-down: migrate-down-courses