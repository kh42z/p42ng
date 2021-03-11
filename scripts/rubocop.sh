#!/usr/bin/env bash

set -e
cd "${0%/*}/../../srcs"


echo "Running rubocop"
rubocop

echo "Running rspec"
docker exec -i pong rspec
