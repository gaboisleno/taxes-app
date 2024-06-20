# Spring / JWT / H2

## Needed to Start

- Java 17

## Running

```bash
./mvnw spring-boot:run
```

The project is ready to work.

Next, I will explain the steps I took to install everything just for documentation purposes.

### Liquibase Installation

### H2 Installation

### JWT Installation

### Endpoints

`POST` `http://localhost:8080/api/auth/register`

body:

```json
{
  "username": "admin",
  "password": "admin"
}
```

Response

```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwZXBlIiwiY3VzdG9tQ2xhaW0iOiJteUN1c3RvbUNsYWltIiwiaWF0IjoxNzE1MzUzMjA5LCJleHAiOjE3MTUzNTQ2NDl9.blbV_Q9tj73KobGYd9iKsiZEI0ZKEwL7t_cUiYDpo6M"
}
```

`POST` `http://localhost:8080/api/auth/login`

body:

```json
{
  "username": "admin",
  "password": "admin"
}
```

Response

```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwZXBlIiwiY3VzdG9tQ2xhaW0iOiJteUN1c3RvbUNsYWltIiwiaWF0IjoxNzE1MzUzMjA5LCJleHAiOjE3MTUzNTQ2NDl9.blbV_Q9tj73KobGYd9iKsiZEI0ZKEwL7t_cUiYDpo6M"
}
```
