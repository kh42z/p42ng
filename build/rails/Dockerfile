FROM ruby:2.7
WORKDIR /app
RUN apt-get update && apt-get install -y \
  curl \
  cron \
  imagemagick \
  build-essential \
  libpq-dev &&\
  curl -sL https://deb.nodesource.com/setup_10.x | bash - && \
  curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
  apt-get update && apt-get install -y nodejs yarn
RUN npm install -g bower
RUN git clone  https://github.com/kh42z/omniauth-marvin.git && cd omniauth-marvin && gem build omniauth-marvin.gemspec && gem install omniauth-marvin && gem uninstall -i /usr/local/lib/ruby/gems/2.7.0 minitest
COPY srcs/Gemfile /app/Gemfile
COPY srcs/Gemfile.lock /app/Gemfile.lock
RUN bundle install
RUN yarn install
RUN crontab -l | { cat; echo ""; } | crontab -
ADD build/rails/docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod 0755 /docker-entrypoint.sh
EXPOSE 3000
ENTRYPOINT ["/bin/bash","-c", "/docker-entrypoint.sh"]
