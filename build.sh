#!/bin/bash
containerName=node-server-mudfield
imageName=mudfield-image

docker build -t imageName .

echo Delete old container...
docker rm -f $containerName

echo Run new container...
docker run -d -p 3000:3000 $imageName --name $containerName
