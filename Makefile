build:
	docker compose build --no-cache --ssh default

up:
	docker compose up

down:
	docker compose down

echo_ip:
	networksetup -getinfo Wi-Fi

app_init:
	docker compose run --rm app bash

docs_init:
	docker compose run --rm docs bash

games_init:
	docker compose run --rm games bash

music_init:
	docker compose run --rm music bash

