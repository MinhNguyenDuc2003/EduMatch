docker stop edumatch_subscription_1
docker rm edumatch_subscription_1
docker rmi registry.edumatch.space/edumatch/subscription:1.1.0
docker pull registry.edumatch.space/edumatch/subscription:1.1.0
docker-compose up -d subscription