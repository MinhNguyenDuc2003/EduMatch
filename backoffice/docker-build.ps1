docker stop edumatch_backoffice-nextjs_1
docker rm edumatch_backoffice-nextjs_1
docker rmi registry.edumatch.space/edumatch/backoffice-nextjs:1.1.0
docker pull registry.edumatch.space/edumatch/backoffice-nextjs:1.1.0
docker-compose up -d backoffice-nextjs