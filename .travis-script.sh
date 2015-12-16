#!/bin/bash

if [ "$TRAVIS_BRANCH" == "master" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
  # Handle master builds
  echo "Building Docker image for ${TRAVIS_BRANCH}"
  grunt build
  docker login -e="$DOCKER_EMAIL" -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD" tutum.co
  docker build -t tutum.co/$DOCKER_USERNAME/angular-cart-demo:latest .
  docker push tutum.co/$DOCKER_USERNAME/angular-cart-demo:latest
elif [ -n "$TRAVIS_TAG" ]; then
  # Handle tagged builds
  echo "Building Docker image for ${TRAVIS_TAG}"
  grunt build
  docker login -e="$DOCKER_EMAIL" -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD" tutum.co
  docker build -t tutum.co/$DOCKER_USERNAME/angular-cart-demo:$TRAVIS_TAG .
  docker push tutum.co/$DOCKER_USERNAME/angular-cart-demo:$TRAVIS_TAG
else
  # unit + integration tests
  npm test

  # protractor end-to-end tests
  npm run update-webdriver
  grunt test:e2e

  # code coverage reports
  npm run coverage-report
  codeclimate-test-reporter < coverage/server/unit/lcov.info
  codeclimate-test-reporter < coverage/server/integration/lcov.info
fi
