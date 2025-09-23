FROM eclipse-temurin:21-jre-alpine
COPY target/customer*.jar app.jar

ENV SPRING_PROFILES_ACTIVE=prod
ENV SPRING_PROFILES_ENVIRONMENT=develop
ENV SPRING_OUTPUT_ANSI_ENABLED=ALWAYS

ENV ENV_PORT=80

ENV ENV_DB_ENDPOINT=postgres
ENV ENV_DB_PORT=5432
ENV ENV_DB_DATABASE=customer
ENV ENV_DB_USERNAME=admin
ENV ENV_DB_PASSWORD=admin
ENV ENV_DB_TYPE=POSTGRES
ENV ENV_DB_CLASS=org.postgresql.Driver
ENV ENV_DB_URL=jdbc:postgresql://
ENV ENV_DB_SEPARATOR=/
ENV ENV_DB_POOL_MINIMUM=2
ENV ENV_DB_POOL_MAXIMUM=10

ENV ENV_ISSUER_URI=http://160.30.113.224/identity/realms/Yas
ENV ENV_AUTHORIZATION_URL=http://160.30.113.224/identity/realms/Yas/protocol/openid-connect/auth
ENV ENV_TOKEN_URL=http://160.30.113.224/identity/realms/Yas/protocol/openid-connect/token

ENV ENV_KEYCLOAK_URL=http://identity/identity
ENV ENV_LOCATION_URL=http://location/location

ENTRYPOINT ["java", "-jar", "/app.jar"]