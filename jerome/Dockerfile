FROM ruby:2.5.0

#dependencies
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs

RUN mkdir /myapp
WORKDIR /myapp


COPY ./source/Gemfile /myapp/Gemfile
COPY ./source/Gemfile.lock /myapp/Gemfile.lock
COPY ./source/docker-entrypoint.sh /myapp/docker-entrypoint.sh
RUN gem install bundler
# RUN bundle update
RUN bundle install


# ENTRYPOINT rm -f tmp/pids/server.pid && rails db:drop db:create db:migrate db:seed

ENTRYPOINT ["sh", "docker-entrypoint.sh"]

#Obsolete
#CMD ["rails", "server"]
