build:
	docker build . --file amazon-crawler/Dockerfile -t amazon-crawler:latest
	docker compose down && docker  compose up
	


