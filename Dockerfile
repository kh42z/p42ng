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
COPY srcs/ /app
RUN bundle install
RUN yarn install
ADD build/rails/heroku-entrypoint.sh /heroku-entrypoint.sh
RUN chmod 0755 /heroku-entrypoint.sh
RUN groupadd -r p42ng && useradd -r -s /bin/false -g p42ng p42ng
RUN chown -R p42ng:p42ng /app
USER p42ng
EXPOSE 3000
ENTRYPOINT ["/bin/bash","-c", "/heroku-entrypoint.sh"]
