# basic-rails-api

## Setup

### env file
```sh
WORKDIR=app-name
POSTGRES_PASSWORD=db-password
CONTAINER_PORT=3000
API_PORT=3000
```

### docker
```sh
dc build
dc run api rails new . --force --database=postgresql --skip-bundle --webpacker --api
dc build
```

### rails
```sh
dc run api rails db:create
```