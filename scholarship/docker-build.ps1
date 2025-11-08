docker stop edumatch_scholarship_1
docker rm edumatch_scholarship_1
docker rmi registry.edumatch.space/edumatch/scholarship:1.1.0
docker pull registry.edumatch.space/edumatch/scholarship:1.1.0
cd ..
docker-compose up -d scholarship