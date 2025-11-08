docker stop edumatch_edufront-nextjs_1
docker rm edumatch_edufront-nextjs_1
docker rmi registry.edumatch.space/edumatch/edufront-nextjs:1.1.0
docker pull registry.edumatch.space/edumatch/edufront-nextjs:1.1.0
cd ..
docker-compose up -d edufront-nextjs