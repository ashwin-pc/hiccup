VERSION=`node -p "require('./package.json').version"`

echo 
echo Building Hiccup - Version: $VERSION
npm run build


echo 
echo Building docker image
docker build -t bleckbeard/hiccup:latest . 
docker tag bleckbeard/hiccup:latest bleckbeard/hiccup:v$VERSION


echo Pushing it to the hub
docker push bleckbeard/hiccup:latest
docker push bleckbeard/hiccup:v$VERSION

echo
echo Zipping the build artifacts
zip -r hiccup@$VERSION.zip ./build/

echo
echo Push the code to github to deploy on the server

