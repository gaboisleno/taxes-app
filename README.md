

### Prerequisites
- Java 17
- Angular Cli
- NPM

### Building
This repository contains a Dockerfile that builds an Angular application and serves it through Spring Boot as a static web content.

Also, with Github Actions, the image is automatically pushed to [DockerHub](https://hub.docker.com). 

[Render](https://render.com) is a free cloud hosting where I host my container.

### Spring Configuration
- MapStruct
- Spring Security
- MongoDB

#### MongoDB Atlas
[MongoDB](www.mongodb.com) offers a free database hosting with a limit (512Mb). In pom.xml we add the conection:

```bash
spring.data.mongodb.uri=${MONGO_URL}
spring.data.mongodb.database=${MONGO_DATABASE}
```

### Angular Configuration
In local development, angular needs a proxy to consume the same local backend.
```json
{
    "/public": {
        "target": "http://localhost:8080",
        "secure": true,
        "changeOrigin": true,
        "logLevel": "debug"
    }
}
```
To build and serve statics app, its important build as browser, and not application. Check angular.json configuration file.

```json
"builder": "@angular-devkit/build-angular:browser",
```

#### Environment files
The project has two environments, production and development, also configured in angular.json


Using angular cli:
```bash
ng generate environments
```

Automatically generates configuration in angular.json
```bash
"fileReplacements": [
    {
        "replace": "src/environments/environment.ts",
            "with": "src/environments/environment.development.ts"
    }
]
```

#### Bootstrap Installation:

- Install Bootstrap using npm:

```bash
npm install bootstrap
```

- Update angular.json to include Bootstrap styles and scripts:

```json
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "src/styles.scss"
],
"scripts": [
  "node_modules/bootstrap/dist/js/bootstrap.min.js"
]
```

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

