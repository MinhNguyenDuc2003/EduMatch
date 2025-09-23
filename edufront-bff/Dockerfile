FROM eclipse-temurin:21-jre-alpine
RUN apk add --no-cache bash
COPY wait-for-it.sh wait-for-it.sh
RUN chmod +x wait-for-it.sh
COPY target/edufront*.jar app.jar

ENV SPRING_PROFILES_ACTIVE=prod
ENV ENV_ISSUER_URI=http://identity/identity/realms/Yas
ENV ENV_AUTHORIZATION_URL=http://identity/identity/realms/Yas/protocol/openid-connect/auth
ENV ENV_TOKEN_URL=http://identity/identity/realms/Yas/protocol/openid-connect/token
ENV ENV_KEYCLOAK_URL=http://identity/identity

ENV ENV_LOCATION_URL=http://location/location
ENV ENV_PORT=80
ENTRYPOINT ["java","-jar","/app.jar"]