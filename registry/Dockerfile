FROM eclipse-temurin:21-jre-alpine
COPY target/registry*.jar app.jar

ENV SPRING_PROFILES_ACTIVE=prod
ENV SPRING_PROFILES_ENVIRONMENT=develop
ENV SPRING_OUTPUT_ANSI_ENABLED=ALWAYS

ENV ENV_PORT=8761

ENV SERVER_PORT=8761
ENV EUREKA_HOSTNAME=registry-server
ENV EUREKA_URL=http://registry-server:8761/eureka/

ENTRYPOINT ["java", "-jar", "/app.jar"]