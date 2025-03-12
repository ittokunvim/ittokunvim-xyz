# make build: Build the docker containers
build:
	docker compose build --no-cache --ssh default

# make up: Start the docker containers
up:
	docker compose up

# make down: Stop the docker containers
down:
	docker compose down

# make echo_ip: Get the IP address of the my computer
echo_ip:
	networksetup -getinfo Wi-Fi

# make app_init: Access the app container
app_init:
	docker compose run --rm app bash

# make docs_init: Access the docs container
docs_init:
	docker compose run --rm docs bash

# make games_init: Access the games container
games_init:
	docker compose run --rm games bash

# make music_init: Access the music container
music_init:
	docker compose run --rm music bash

