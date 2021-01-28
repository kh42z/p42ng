#!/bin/sh
set -x
rake db:reset db:migrate db:seed
rails server -b 0.0.0.0

