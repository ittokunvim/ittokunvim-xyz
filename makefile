web-bash:
	docker compose run --rm web bash

web-lint:
	docker compose run --rm web npm run lint
