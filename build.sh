git pull
echo stopping containers...
docker-compose down
echo building containers...
docker-compose up --build