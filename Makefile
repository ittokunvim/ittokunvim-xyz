build:
	docker compose build --no-cache --ssh default

up:
	docker compose up

down:
	docker compose down

web_bash:
	docker compose exec web bash

ip_pri:
	networksetup -getinfo Wi-Fi
