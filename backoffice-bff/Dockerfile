FROM eclipse-temurin:21-jre-alpine
RUN apk add --no-cache bash
COPY target/backoffice*.jar app.jar
COPY wait-for-it.sh wait-for-it.sh
RUN chmod +x wait-for-it.sh

ENV SPRING_PROFILES_ACTIVE=prod
ENV ENV_ISSUER_URI=https://api.edumatch.space/identity/realms/Yas
ENV ENV_PORT=80

ENTRYPOINT ["java","-jar","/app.jar"]