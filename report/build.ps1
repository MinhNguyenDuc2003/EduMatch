$REGISTRY = "registry.edumatch.space"
$PROJECT  = "edumatch"
$SERVICE  = "report"
$VERSION  = "1.1.0"

docker build -t "$($SERVICE):$($VERSION)" .
docker tag "$($SERVICE):$($VERSION)" "$($REGISTRY)/$($PROJECT)/$($SERVICE):$($VERSION)"
docker login $REGISTRY
docker push "$($REGISTRY)/$($PROJECT)/$($SERVICE):$($VERSION)"
