# Pong

### Run:
`docker-compose up --build`

### Integration tests:
Generate:

`docker exec -ti pong rake rswag`

Execute:

`docker exec -ti pong bundle exec rspec spec/integration`

### API Documentation

http://localhost:3000/api-docs/index.html