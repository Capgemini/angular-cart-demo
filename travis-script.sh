#!/bin/bash

if [ "$TRAVIS_BRANCH" == "travis-test" ]; then
  # Handle master builds
  grunt build
  docker build -t tutum.co/$DOCKER_USERNAME/angular-cart-demo:$TRAVIS_BRANCH .
  docker push tutum.co/$DOCKER_USERNAME/angular-cart-demo:$TRAVIS_BRANCH
elif [ -n "$TRAVIS_TAG" ]; then
  # Handle tagged builds
  grunt build
  docker build -t tutum.co/$DOCKER_USERNAME/angular-cart-demo:$TRAVIS_TAG .
  docker push tutum.co/$DOCKER_USERNAME/angular-cart-demo:$TRAVIS_TAG
else
  npm test
fi
