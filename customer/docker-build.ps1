docker stop edumatch_customer_1
docker rm edumatch_customer_1
docker rmi registry.edumatch.space/edumatch/customer:1.1.0
docker pull registry.edumatch.space/edumatch/customer:1.1.0
docker-compose up -d customer