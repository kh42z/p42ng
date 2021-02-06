FROM ruby:2.7
WORKDIR /app
RUN apt-get update && apt-get install -y \
  curl \
  build-essential \
  libpq-dev &&\
  curl -sL https://deb.nodesource.com/setup_10.x | bash - && \
  curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
  apt-get update && apt-get install -y nodejs yarn
RUN git clone --depth 1 https://github.com/kh42z/omniauth-marvin.git && cd omniauth-marvin && gem build omniauth-marvin.gemspec && gem install omniauth-marvin
RUN git clone -b v1.1.5 --depth 1 https://github.com/lynndylanhurley/devise_token_auth.git && cd devise_token_auth && gem build devise_token_auth.gemspec && gem install devise_token_auth
RUN npm install -g bower
COPY server/Gemfile /app/Gemfile
COPY server/Gemfile.lock /app/Gemfile.lock
RUN bundle install
RUN yarn install
ADD docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod 0755 /docker-entrypoint.sh
EXPOSE 3000
ENTRYPOINT ["/bin/bash","-c", "/docker-entrypoint.sh"]