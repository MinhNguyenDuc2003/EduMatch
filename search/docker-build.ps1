docker stop edumatch_search_1
docker rm edumatch_search_1
docker rmi registry.edumatch.space/edumatch/search:1.1.0
docker pull registry.edumatch.space/edumatch/search:1.1.0
cd ..
docker-compose up -d search
docker stop edumatch_nginx_1
docker rm edumatch_nginx_1
docker-compose up -d nginx