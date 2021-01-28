#!/usr/bin/env bash

set -e
cd "${0%/*}/../../server"


echo "Running rubocop"
rubocop -A
