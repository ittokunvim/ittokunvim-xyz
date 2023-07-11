run:
	docker compose build
	docker compose up

down:
	docker compose down

web-bash:
	docker compose run --rm web bash

web-lint:
	docker compose run --rm web npm run lint
