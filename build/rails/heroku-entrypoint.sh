#!/bin/sh
set -x
rm -f /tmp/rails.pid
bower install --allow-root
service cron start
rails db:migrate
rails server -b 0.0.0.0 --pid /tmp/rails.pid -p ${PORT}
