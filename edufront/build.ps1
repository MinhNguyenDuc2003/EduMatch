$REGISTRY = "registry.edumatch.space"
$PROJECT  = "edumatch"
$SERVICE  = "edufront-nextjs"
$VERSION  = "1.0.0"

docker build -t "$($SERVICE):$($VERSION)" .
docker tag "$($SERVICE):$($VERSION)" "$($REGISTRY)/$($PROJECT)/$($SERVICE):$($VERSION)"
docker login $REGISTRY
docker push "$($REGISTRY)/$($PROJECT)/$($SERVICE):$($VERSION)"
