#!/bin/sh
set -x
rm -f /tmp/rails.pid
bower install --allow-root
#rails db:environment:set RAILS_ENV=development
rails db:reset
rails db:migrate:reset
rails db:seed
rails server -b 0.0.0.0 --pid /tmp/rails.pid
