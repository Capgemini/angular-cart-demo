#!/bin/bash

set -e

cat marathon.json | \
  jq '.container.docker.image |= "$DOCKER_REPO_USERNAME/angular-cart-demo:$TRAVIS_TAG"' > marathon.json

if [ curl -H "Content-Type: application/json" http://$MARATHON_HOST:8080/v2/apps?id=angular-cart | grep -q '{\"apps\":\[\]}' ]; then
  # post the application to Marathon
  curl -X POST -H "Content-Type: application/json" http://$MARATHON_HOST:8080/v2/apps -d@marathon.json
else
  # put the application to Marathon
  curl -X PUT -H "Content-Type: application/json" http://$MARATHON_HOST:8080/v2/apps/angular-cart?force=true -d@marathon.json
fi
