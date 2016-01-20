#!/bin/bash

if [ "$TRAVIS_BRANCH" == "master" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
  # Handle master builds
  echo "Building Docker image for ${TRAVIS_BRANCH}"
  grunt build
  if [ -z "$DOCKER_REPO_USERNAME" ]; then
    DOCKER_REPO_USERNAME=$DOCKER_USERNAME
  fi
  if [ "$DOCKER_REGISTRY" == "hub.docker.com" ] || [ -z "$DOCKER_REGISTRY" ]; then 
    docker login -e="$DOCKER_EMAIL" -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD"
    docker build -t $DOCKER_REPO_USERNAME/angular-cart-demo:latest .
    docker push $DOCKER_REPO_USERNAME/angular-cart-demo:latest
  else
    docker login -e="$DOCKER_EMAIL" -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD" $DOCKER_REGISTRY
    docker build -t $DOCKER_REPO_USERNAME/$DOCKER_USERNAME/angular-cart-demo:latest .
    docker push $DOCKER_REPO_USERNAME/$DOCKER_USERNAME/angular-cart-demo:latest
  fi
elif [ -n "$TRAVIS_TAG" ]; then
  # Handle tagged builds
  echo "Building Docker image for ${TRAVIS_TAG}"
  grunt build
  if [ "$DOCKER_REGISTRY" == "hub.docker.com" ] || [ -z "$DOCKER_REGISTRY" ]; then 
    docker login -e="$DOCKER_EMAIL" -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD"
    docker build -t $DOCKER_USERNAME/angular-cart-demo:$TRAVIS_TAG .
    docker push $DOCKER_USERNAME/angular-cart-demo:$TRAVIS_TAG
  else
    docker login -e="$DOCKER_EMAIL" -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD" $DOCKER_REGISTRY
    docker build -t $DOCKER_REGISTRY/$DOCKER_USERNAME/angular-cart-demo:$TRAVIS_TAG .
    docker push $DOCKER_REGISTRY/$DOCKER_USERNAME/angular-cart-demo:$TRAVIS_TAG
  fi
else
  # unit + integration tests
  npm test

  # grunt retire.js vulnerability scanner
  grunt retire

  # protractor end-to-end tests
  grunt test:e2e

  # code coverage reports
  npm run coverage-report
  codeclimate-test-reporter < coverage/server/unit/lcov.info
  codeclimate-test-reporter < coverage/server/integration/lcov.info

  # Docker tests
  docker run --rm -v $(pwd):/lint lukasmartinelli/hadolint hadolint /lint/Dockerfile
  docker run -v $(pwd):/app -v $(pwd)/lynis-logs:/var/log dduportal/lynis:2.1.0 \
    --auditor "Automator" --quick audit dockerfile /app/Dockerfile

  nohup grunt serve &
  docker run -u zap -i owasp/zap2docker-stable zap-cli quick-scan -sc \
    -o '-config api.disablekey=true' -s xss,sqli --spider "http://localhost:9000"

fi
