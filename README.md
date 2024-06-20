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

Add Liquibase dependency in the `pom.xml`:

```xml
<dependency>
    <groupId>org.liquibase</groupId>
    <artifactId>liquibase-core</artifactId>
</dependency>
```

In the `application.properties` add liquibase master file location

```bash
spring.liquibase.change-log=classpath:/liquibase/master.xml
```

Create directory `/resources/liquibase/changelog`

Create `master.xml` in `/resources/liquibase`

`master.xml` will read all files inside `/resources/liquibase/changelog`

```xml
<?xml version="1.0" encoding="utf-8"?>
<databaseChangeLog
    xmlns="http://www.liquibase.org/xml/ns/dbchangelog"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-4.6.xsd">
     <includeAll path="/liquibase/changelog/"/>
</databaseChangeLog>
```

Finally, add one initial migration to avoid failure on `springboot:run`.

If you prefer, you can add migrations manually one by one in the `master.xml` file changing the `includeAll` tag to:

```xml
<include file="path/to/file">
```

### H2 Installation

Add H2 dependency in the `pom.xml`:

```xml
    <dependency>
        <groupId>com.h2database</groupId>
        <artifactId>h2</artifactId>
        <scope>runtime</scope>
    </dependency>
```

In the `application.properties`, add H2 configuration for connection and local file:

```bash
spring.datasource.url=jdbc:h2:file:./src/main/resources/data/h2database
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
```

### JWT Installation

TO-DO

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
