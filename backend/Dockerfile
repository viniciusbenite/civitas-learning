FROM maven:3.9.9-sapmachine-23 AS build

WORKDIR /home/backend

COPY src ./src
COPY pom.xml .

RUN mvn clean package

FROM eclipse-temurin:17-jdk-jammy

COPY --from=build /home/backend/target/backend-0.0.1-SNAPSHOT.jar /usr/local/lib/backend.jar

ENTRYPOINT ["java","-jar","/usr/local/lib/backend.jar"]
