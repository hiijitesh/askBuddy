date=$(date +%d.%m.%Y)
echo "Building..."
echo "Date"  $date
echo "checkout to dev"
git checkout dev
echo "Version: " $date
echo "Docker Build Started"
docker build -t hiijitesh/stackoverflow-clone:$date .
echo "Docker Build complete"
echo "Pushing image to Dockerhub"
docker push hiijitesh/stackoverflow-clone:$date
echo "Docker Push complete"
echo "Deploying the container"
echo "start docker-compose"
docker-compose down && docker-compose up -d
echo "Deployment finished"