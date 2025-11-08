docker stop edumatch_media_1
docker rm edumatch_media_1
docker rmi registry.edumatch.space/edumatch/media:1.1.0
docker pull registry.edumatch.space/edumatch/media:1.1.0
docker-compose up -d media