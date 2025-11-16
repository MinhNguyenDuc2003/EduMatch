docker stop edumatch_report_1
docker rm edumatch_report_1
docker rmi registry.edumatch.space/edumatch/report:1.1.0
docker pull registry.edumatch.space/edumatch/report:1.1.0
cd ..
docker-compose up -d report