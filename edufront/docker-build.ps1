docker stop edumatch_edufront-nextjs_1
docker rm edumatch_edufront-nextjs_1
docker rmi registry.edumatch.space/edumatch/edufront-nextjs:1.0.0
docker pull registry.edumatch.space/edumatch/edufront-nextjs:1.0.0
cd ..
docker-compose up -d edufront-nextjs
docker stop edumatch_nginx_1
docker rm edumatch_nginx_1
docker-compose up -d nginx