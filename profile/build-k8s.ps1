$REGISTRY = "registry.edumatch.space"
$PROJECT  = "edumatch"
$SERVICE  = "profile-k8s"
$VERSION  = "1.0.0"

docker build -f Dockerfile.k8s -t "$($SERVICE):$($VERSION)" .
docker tag "$($SERVICE):$($VERSION)" "$($REGISTRY)/$($PROJECT)/$($SERVICE):$($VERSION)"
docker login $REGISTRY
docker push "$($REGISTRY)/$($PROJECT)/$($SERVICE):$($VERSION)"
