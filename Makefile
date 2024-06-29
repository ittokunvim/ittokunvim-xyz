build:
	docker compose build --no-cache --ssh default

up:
	docker compose up

down:
	docker compose down

echo_ip:
	networksetup -getinfo Wi-Fi
