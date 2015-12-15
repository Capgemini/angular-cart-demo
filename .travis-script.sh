#!/bin/bash

if [ "$TRAVIS_BRANCH" == "master" ]; then
  # Handle master builds
  echo "Building Docker image for ${TRAVIS_BRANCH}"
  grunt build
  docker build -t tutum.co/$DOCKER_USERNAME/angular-cart-demo:latest .
  docker push tutum.co/$DOCKER_USERNAME/angular-cart-demo:latest
elif [ -n "$TRAVIS_TAG" ]; then
  # Handle tagged builds
  echo "Building Docker image for ${TRAVIS_TAG}"
  grunt build
  docker build -t tutum.co/$DOCKER_USERNAME/angular-cart-demo:$TRAVIS_TAG .
  docker push tutum.co/$DOCKER_USERNAME/angular-cart-demo:$TRAVIS_TAG
else
  npm test
fi
