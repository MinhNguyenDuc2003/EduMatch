docker stop edumatch_subscription_1
docker rm edumatch_subscription_1
docker rmi registry.edumatch.space/edumatch/subscription:1.0.0
docker pull registry.edumatch.space/edumatch/subscription:1.0.0
cd ..
docker-compose up -d subscription
docker stop edumatch_nginx_1
docker rm edumatch_nginx_1
docker-compose up -d nginx