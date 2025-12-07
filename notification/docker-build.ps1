docker stop edumatch_notification_1
docker rm edumatch_notification_1
docker rmi registry.edumatch.space/edumatch/notification:1.1.0
docker pull registry.edumatch.space/edumatch/notification:1.1.0
cd ..
docker-compose up -d notification
docker stop edumatch_nginx_1
docker rm edumatch_nginx_1
docker-compose up -d nginx