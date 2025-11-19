docker stop edumatch_backoffice-nextjs_1
docker rm edumatch_backoffice-nextjs_1
docker rmi registry.edumatch.space/edumatch/backoffice-nextjs:1.0.0
docker pull registry.edumatch.space/edumatch/backoffice-nextjs:1.0.0
cd ..
docker-compose up -d backoffice-nextjs
docker stop edumatch_nginx_1
docker rm edumatch_nginx_1
docker-compose up -d nginx