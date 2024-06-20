#Etapa 1: Preparacion del entorno de Angular
FROM node:18-slim AS frontend
WORKDIR /app
COPY src/main/webapp ./webapp
RUN cd webapp && npm install && npm run build

#Etapa 2: Preparacion del entorno de Maven y construccion de la app
FROM maven:3.8.5-openjdk-17 AS maven
WORKDIR /app
COPY src/ ./src/
COPY pom.xml .
COPY --from=frontend /app/webapp/dist /app/src/main/resources/static
RUN mvn clean package -DskipTests=true

#Etapa 3: Configuracion de la imagen final
FROM openjdk:17-alpine
WORKDIR /app
COPY --from=maven /app/target/*.jar /app/app.jar

ENTRYPOINT [ "java", "-jar", "/app/app.jar" ]