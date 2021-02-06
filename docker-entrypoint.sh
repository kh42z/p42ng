#!/bin/sh
set -x
rm -f /tmp/rails.pid
bower install --allow-root
rake db:reset db:migrate db:seed
bundle install
rails server -b 0.0.0.0 --pid /tmp/rails.pid
