#needed but why?
rm -f tmp/pids/server.pid;

#If database is not yet created Rake Obsolete?
#rake db:create;
#rake db:migrate;
#Migrations
bin/rails db:drop db:create db:migrate db:seed

# srails webpacker:install;

touch success.txt && echo "The script was successfuly executed" > success.txt;

bin/rails s -b 0.0.0.0;
