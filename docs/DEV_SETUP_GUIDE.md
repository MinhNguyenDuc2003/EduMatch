# EduMatch Development Environment Setup Guide

This guide will help you set up and run the EduMatch platform in your local development environment.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Java Development Kit (JDK) 17 or higher**
- **Maven 3.8+**
- **Docker Desktop** (with Docker Compose)
- **Git**
- **Node.js 18+** (for frontend development)

## Quick Start (Development Mode)

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd EduMatch
```

### 2. Configure Environment Variables

Copy the example environment file and update it with your local settings:

```bash
cp .env.example .env
```

For **development**, your `.env` file should have these key settings:

```env
# Platform
ENV_PLATFORM=local

# PostgreSQL
POSTGRES_USER=admin
POSTGRES_PASSWORD=minh01672527656
POSTGRES_HOST=postgres
POSTGRES_PORT=5432

# Kafka
KAFKA_SERVICE_HOST=kafka
KAFKA_SERVICE_PORT=9092

# Redis
SPRING_DATA_REDIS_HOST=redis
SPRING_DATA_REDIS_PORT=6379

# AWS (for media storage - use your credentials)
AWS_ACCESS_KEY_ID=YOUR_AWS_ACCESS_KEY
AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_KEY
AWS_DEFAULT_REGION=ap-southeast-1
AWS_BUCKET_NAME=edumatch

# Google Gemini AI (for scholarship matching)
GOOGLE_GENAI_API_KEY=YOUR_GOOGLE_GEMINI_API_KEY

# AI Match Service
SCHOLARSHIP_DB_HOST=postgres
PROFILE_DB_HOST=postgres
```

### 3. Build the Project

Build all Spring Boot microservices using Maven:

```bash
mvn clean install -DskipTests
```

> **Note**: `-DskipTests` skips running tests during build. Remove this flag if you want to run tests.

### 4. Start Infrastructure Services

Start all required infrastructure services (PostgreSQL, Kafka, Redis, Elasticsearch, Keycloak) using Docker Compose:

```bash
docker-compose -f docker-compose.dev.yml up -d
```

This will start:
- **PostgreSQL** (port 5432) - Database
- **Keycloak** (port 8080) - Identity & Access Management
- **Redis** (port 6379) - Cache
- **Kafka** (port 9092) - Message Broker
- **Zookeeper** (port 2181) - Kafka coordination
- **Kafka Connect** (port 8083) - Data streaming
- **Kafka UI** (port 8089) - Kafka management interface
- **Elasticsearch** (port 9200) - Search engine

### 5. Verify Infrastructure Services

Check that all services are running:

```bash
docker-compose -f docker-compose.dev.yml ps
```

All services should show status as "Up" or "running".

### 6. Set Up Kafka Connectors

Once Kafka Connect is running, configure the Debezium and Elasticsearch connectors.

#### a. Register Debezium PostgreSQL Connector (CDC)

This connector captures changes from the PostgreSQL scholarship table and publishes them to Kafka:

```bash
curl -X POST http://localhost:8083/connectors \
  -H "Content-Type: application/json" \
  -d @kafka/connects/debezium-scholarship.json
```

#### b. Register Elasticsearch Sink Connector

This connector consumes messages from Kafka and indexes them in Elasticsearch:

```bash
curl -X POST http://localhost:8083/connectors \
  -H "Content-Type: application/json" \
  -d @kafka/connects/elasticsearch-scholarship-sink.json
```

#### c. Verify Connectors

Check connector status:

```bash
# List all connectors
curl http://localhost:8083/connectors

# Check specific connector status
curl http://localhost:8083/connectors/postgres-scholarship-connector/status
curl http://localhost:8083/connectors/elasticsearch-scholarship-sink/status
```

You can also use **Kafka UI** at http://localhost:8089 to manage connectors visually.

### 7. Run Spring Boot Microservices

You can run services individually or all together.

#### Option A: Run Individual Services

Navigate to each service directory and run:

```bash
# Identity Service (if not using Keycloak container)
cd identity
mvn spring-boot:run

# Profile Service
cd ../profile
mvn spring-boot:run

# Scholarship Service
cd ../scholarship
mvn spring-boot:run

# Search Service
cd ../search
mvn spring-boot:run

# Notification Service
cd ../notification
mvn spring-boot:run

# Media Service
cd ../media
mvn spring-boot:run

# Customer Service
cd ../customer
mvn spring-boot:run

# Report Service
cd ../report
mvn spring-boot:run

# Subscription Service
cd ../subscription
mvn spring-boot:run

# Backend for Frontend (BFF) - Edufront
cd ../edufront-bff
mvn spring-boot:run

# Backend for Frontend (BFF) - Backoffice
cd ../backoffice-bff
mvn spring-boot:run
```

#### Option B: Run All Services with Docker Compose

If you have Docker images built for all services:

```bash
docker-compose up -d
```

### 8. Run AI Matching Service

The AI matching service is a Python FastAPI application:

```bash
cd ai-match
docker-compose up -d
```

Or run locally:

```bash
cd ai-match
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 9. Run Frontend Applications

#### Edufront (Student Portal)

```bash
cd edufront
npm install
npm run dev
```

Access at: http://localhost:3000

#### Backoffice (Admin Portal)

```bash
cd backoffice
npm install
npm run dev
```

Access at: http://localhost:3001

## Service Ports Reference

| Service | Port | Description |
|---------|------|-------------|
| Keycloak | 8080 | Identity & Access Management |
| PostgreSQL | 5432 | Database |
| Redis | 6379 | Cache |
| Kafka | 9092 | Message Broker |
| Kafka UI | 8089 | Kafka Management Interface |
| Kafka Connect | 8083 | Data Streaming Connectors |
| Elasticsearch | 9200 | Search Engine |
| AI Match API | 8000 | AI Matching Service |
| Edufront | 3000 | Student Portal |
| Backoffice | 3001 | Admin Portal |

## Troubleshooting

### Issue: Kafka Connect connectors fail to start

**Solution**: Ensure PostgreSQL is fully initialized before registering connectors. Wait 30-60 seconds after starting `docker-compose.dev.yml`.

### Issue: Elasticsearch connector not found

**Solution**: The default Debezium Connect image may not include the Elasticsearch connector. You need to build a custom image:

1. Create `docker/kafka-connect/Dockerfile`:

```dockerfile
FROM debezium/connect:2.7.3.Final

# Install Elasticsearch Connector
RUN cd /kafka/connect && \
    curl -O https://d1i4a15mxbxib1.cloudfront.net/api/plugins/confluentinc/kafka-connect-elasticsearch/versions/14.0.15/confluentinc-kafka-connect-elasticsearch-14.0.15.zip && \
    unzip confluentinc-kafka-connect-elasticsearch-14.0.15.zip && \
    rm confluentinc-kafka-connect-elasticsearch-14.0.15.zip
```

2. Update `docker-compose.dev.yml`:

```yaml
kafka-connect:
  build: ./docker/kafka-connect
  # ... rest of configuration
```

3. Rebuild:

```bash
docker-compose -f docker-compose.dev.yml build kafka-connect
docker-compose -f docker-compose.dev.yml up -d kafka-connect
```

### Issue: Database connection errors

**Solution**: 
- Verify PostgreSQL is running: `docker-compose -f docker-compose.dev.yml ps postgres`
- Check database logs: `docker-compose -f docker-compose.dev.yml logs postgres`
- Ensure `.env` has correct credentials

### Issue: Port conflicts

**Solution**: If ports are already in use, you can change them in `.env` file or stop conflicting services.

### Issue: Services can't connect to each other

**Solution**: Ensure all services are on the same Docker network (`m-network`). Check with:

```bash
docker network inspect m-network
```

## Development Workflow

### 1. Making Code Changes

After modifying code in any microservice:

```bash
cd <service-directory>
mvn clean install -DskipTests
mvn spring-boot:run
```

### 2. Database Migrations

Migrations are automatically applied on service startup using Flyway. Migration files are located in:

```
<service>/src/main/resources/db/migration/
```

### 3. Testing Kafka Data Flow

1. Make a change in the database (e.g., insert/update scholarship)
2. Check Kafka topic in Kafka UI: http://localhost:8089
3. Verify data appears in Elasticsearch:

```bash
curl http://localhost:9200/scholarship.scholarship.scholarship/_search?pretty
```

### 4. Viewing Logs

```bash
# Docker services
docker-compose -f docker-compose.dev.yml logs -f <service-name>

# Spring Boot services (if running locally)
# Logs appear in console
```

## Stopping Services

### Stop Infrastructure Only

```bash
docker-compose -f docker-compose.dev.yml down
```

### Stop Infrastructure and Remove Volumes (Clean Slate)

```bash
docker-compose -f docker-compose.dev.yml down -v
```

> **Warning**: This will delete all data in PostgreSQL, Elasticsearch, and Redis!

## Next Steps

- Review [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for production deployment
- Check [API Documentation](http://localhost:8089/swagger-ui) (when services are running)
- Read [QUALITY_MANAGEMENT.md](./QUALITY_MANAGEMENT.md) for coding standards

## Getting Help

- Check service logs for error messages
- Verify all environment variables are set correctly
- Ensure Docker has sufficient resources (4GB+ RAM recommended)
- Review Docker Compose service dependencies

For more information, contact the development team.
