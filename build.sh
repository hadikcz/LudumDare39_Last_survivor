#!/bin/bash
containerName=node-server-mudfield
imageName=mudfield-image

docker build -t -f Dockerfile $imageName .

echo Delete old container...
docker rm -f $containerName

echo Run new container...
docker run -d -p 5000:5000 --name $containerName $imageName
