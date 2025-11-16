docker stop edumatch_payment_1
docker rm edumatch_payment_1
docker rmi registry.edumatch.space/edumatch/payment:1.1.0
docker pull registry.edumatch.space/edumatch/payment:1.1.0
cd ..
docker-compose up -d payment