docker stop edumatch_profile_1
docker rm edumatch_profile_1
docker rmi registry.edumatch.space/edumatch/profile:1.1.0
docker pull registry.edumatch.space/edumatch/profile:1.1.0
cd ..
docker-compose up -d profile