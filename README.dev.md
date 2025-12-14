# EduMatch Development Environment - Complete Setup Guide

## 📚 Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Detailed Setup](#detailed-setup)
- [Kafka Connectors Setup](#kafka-connectors-setup)
- [Running Services](#running-services)
- [Troubleshooting](#troubleshooting)

---

## Overview

This guide provides complete instructions for setting up the EduMatch development environment with:
- ✅ Spring Boot microservices
- ✅ PostgreSQL with Debezium CDC
- ✅ Kafka + Kafka Connect
- ✅ Elasticsearch for search
- ✅ Redis for caching
- ✅ Keycloak for authentication

---

## Prerequisites

Ensure you have installed:

| Tool | Version | Download |
|------|---------|----------|
| Java JDK | 17+ | https://adoptium.net/ |
| Maven | 3.8+ | https://maven.apache.org/ |
| Docker Desktop | Latest | https://www.docker.com/ |
| Node.js | 18+ | https://nodejs.org/ |
| Git | Latest | https://git-scm.com/ |

**Verify installations:**
```bash
java -version
mvn -version
docker --version
node --version
git --version
```

---

## Quick Start

### 1. Clone and Configure

```bash
# Clone repository
git clone <your-repo-url>
cd EduMatch

# Copy environment file
cp .env.example .env
```

### 2. Update `.env` File

Edit `.env` and set these **required** values:

```env
# AWS Credentials (for media storage)
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key

# Google Gemini AI (for scholarship matching)
GOOGLE_GENAI_API_KEY=your_gemini_api_key
```

### 3. Build Project

```bash
mvn clean install -DskipTests
```

### 4. Start Infrastructure

```bash
docker-compose -f docker-compose.dev.yml up -d
```

**Wait 30-60 seconds** for all services to initialize.

### 5. Setup Kafka Connectors

**Windows:**
```bash
scripts\setup-connectors.bat
```

**Linux/Mac:**
```bash
chmod +x scripts/setup-connectors.sh
./scripts/setup-connectors.sh
```

### 6. Run Your Service

```bash
cd scholarship
mvn spring-boot:run
```

---

## Detailed Setup

### Step 1: Build Custom Kafka Connect Image

The default Debezium image doesn't include the Elasticsearch connector. We need to build a custom image:

```bash
# Build custom Kafka Connect with Elasticsearch connector
docker-compose -f docker-compose.dev.yml build kafka-connect
```

This builds the image from `docker/kafka-connect/Dockerfile` which includes:
- Debezium PostgreSQL connector (for CDC)
- Confluent Elasticsearch sink connector

### Step 2: Start All Infrastructure Services

```bash
docker-compose -f docker-compose.dev.yml up -d
```

This starts:

| Service | Port | Purpose |
|---------|------|---------|
| PostgreSQL | 5432 | Database with Debezium support |
| Keycloak | 8080 | Identity & Access Management |
| Redis | 6379 | Caching layer |
| Zookeeper | 2181 | Kafka coordination |
| Kafka | 9092 | Message broker |
| Kafka Connect | 8083 | Data streaming connectors |
| Kafka UI | 8089 | Kafka management interface |
| Elasticsearch | 9200 | Search engine |

**Verify all services are running:**
```bash
docker-compose -f docker-compose.dev.yml ps
```

All services should show status as "Up".

### Step 3: Verify Service Health

```bash
# Check Kafka Connect is ready
curl http://localhost:8083

# Check Elasticsearch is ready
curl http://localhost:9200

# Check PostgreSQL is ready
docker exec -it $(docker ps -qf "name=postgres") pg_isready -U admin
```

---

## Kafka Connectors Setup

### Understanding the Data Flow

```
PostgreSQL (scholarship table)
    ↓ (Debezium CDC)
Kafka Topic (scholarship.scholarship.scholarship)
    ↓ (Elasticsearch Sink)
Elasticsearch Index (scholarship.scholarship.scholarship)
```

### Connector 1: Debezium PostgreSQL Source

**File:** `kafka/connects/debezium-scholarship.json`

This connector:
- Monitors the `scholarship.scholarship` table in PostgreSQL
- Captures INSERT, UPDATE, DELETE events
- Publishes changes to Kafka topic `scholarship.scholarship.scholarship`

**Configuration:**
```json
{
  "name": "postgres-scholarship-connector",
  "config": {
    "connector.class": "io.debezium.connector.postgresql.PostgresConnector",
    "database.hostname": "postgres",
    "database.port": "5432",
    "database.user": "admin",
    "database.password": "minh01672527656",
    "database.dbname": "scholarship",
    "table.include.list": "scholarship.scholarship",
    "topic.prefix": "scholarship"
  }
}
```

### Connector 2: Elasticsearch Sink

**File:** `kafka/connects/elasticsearch-scholarship-sink.json`

This connector:
- Consumes messages from Kafka topic `scholarship.scholarship.scholarship`
- Transforms Debezium CDC events to extract the new record state
- Indexes documents in Elasticsearch

**Configuration:**
```json
{
  "name": "elasticsearch-scholarship-sink",
  "config": {
    "connector.class": "io.confluent.connect.elasticsearch.ElasticsearchSinkConnector",
    "topics": "scholarship.scholarship.scholarship",
    "connection.url": "http://elasticsearch:9200",
    "transforms": "unwrap,key",
    "transforms.unwrap.type": "io.debezium.transforms.ExtractNewRecordState"
  }
}
```

### Register Connectors

**Automated (Recommended):**

Windows:
```bash
scripts\setup-connectors.bat
```

Linux/Mac:
```bash
./scripts/setup-connectors.sh
```

**Manual Registration:**

```bash
# Register Debezium connector
curl -X POST http://localhost:8083/connectors \
  -H "Content-Type: application/json" \
  -d @kafka/connects/debezium-scholarship.json

# Register Elasticsearch connector
curl -X POST http://localhost:8083/connectors \
  -H "Content-Type: application/json" \
  -d @kafka/connects/elasticsearch-scholarship-sink.json
```

### Verify Connectors

```bash
# List all connectors
curl http://localhost:8083/connectors

# Check connector status
curl http://localhost:8083/connectors/postgres-scholarship-connector/status
curl http://localhost:8083/connectors/elasticsearch-scholarship-sink/status
```

**Expected output:**
```json
{
  "name": "postgres-scholarship-connector",
  "connector": {
    "state": "RUNNING",
    "worker_id": "kafka-connect:8083"
  },
  "tasks": [
    {
      "id": 0,
      "state": "RUNNING",
      "worker_id": "kafka-connect:8083"
    }
  ]
}
```

**Visual Management:**

Visit Kafka UI at http://localhost:8089 to:
- View connector status
- Monitor Kafka topics
- Inspect messages
- Manage connectors

---

## Running Services

### Option 1: Run Individual Services Locally

Best for active development on specific services.

```bash
# Navigate to service directory
cd scholarship

# Run with Maven
mvn spring-boot:run
```

**Common services:**
```bash
# Profile Service
cd profile && mvn spring-boot:run

# Scholarship Service
cd scholarship && mvn spring-boot:run

# Search Service
cd search && mvn spring-boot:run

# Notification Service
cd notification && mvn spring-boot:run

# Media Service
cd media && mvn spring-boot:run
```

### Option 2: Run All Services with Docker

Best for testing the complete system.

```bash
# Build Docker images for all services
mvn clean install -DskipTests

# Start all services
docker-compose up -d
```

### Option 3: Hybrid Approach

Run infrastructure in Docker, specific services locally.

```bash
# Start infrastructure only
docker-compose -f docker-compose.dev.yml up -d

# Run your service locally
cd scholarship
mvn spring-boot:run
```

---

## Testing the Data Pipeline

### 1. Insert Test Data

```bash
docker exec -it $(docker ps -qf "name=postgres") psql -U admin -d scholarship -c \
  "INSERT INTO scholarship.scholarship (title, description, amount, deadline) 
   VALUES ('Test Scholarship', 'This is a test', 5000, '2025-12-31');"
```

### 2. Check Kafka Topic

Visit http://localhost:8089 and navigate to:
- Topics → `scholarship.scholarship.scholarship`
- View messages to see the CDC event

### 3. Verify Elasticsearch

```bash
# Search for the test scholarship
curl http://localhost:9200/scholarship.scholarship.scholarship/_search?q=title:Test

# Count documents
curl http://localhost:9200/scholarship.scholarship.scholarship/_count
```

---

## Troubleshooting

### Issue: Elasticsearch connector not found

**Symptom:**
```
Connector class io.confluent.connect.elasticsearch.ElasticsearchSinkConnector not found
```

**Solution:**
```bash
# Rebuild Kafka Connect image with Elasticsearch plugin
docker-compose -f docker-compose.dev.yml build kafka-connect
docker-compose -f docker-compose.dev.yml up -d kafka-connect

# Wait 30 seconds, then register connectors again
scripts\setup-connectors.bat
```

### Issue: Connector fails with "Slot already exists"

**Symptom:**
```
ERROR: replication slot "scholarship_slot" already exists
```

**Solution:**
```bash
# Delete the replication slot
docker exec -it $(docker ps -qf "name=postgres") psql -U admin -d scholarship -c \
  "SELECT pg_drop_replication_slot('scholarship_slot');"

# Restart the connector
curl -X POST http://localhost:8083/connectors/postgres-scholarship-connector/restart
```

### Issue: No data in Elasticsearch

**Diagnosis Steps:**

1. **Check Debezium connector:**
```bash
curl http://localhost:8083/connectors/postgres-scholarship-connector/status
```
Should show `"state": "RUNNING"`

2. **Check Kafka topic has messages:**
Visit http://localhost:8089 → Topics → `scholarship.scholarship.scholarship`

3. **Check Elasticsearch connector:**
```bash
curl http://localhost:8083/connectors/elasticsearch-scholarship-sink/status
```

4. **Check Elasticsearch logs:**
```bash
docker-compose -f docker-compose.dev.yml logs elasticsearch
```

### Issue: Port conflicts

**Symptom:**
```
Error: bind: address already in use
```

**Solution (Windows):**
```bash
# Find process using port
netstat -ano | findstr :5432

# Kill process
taskkill /PID <PID> /F
```

**Solution (Linux/Mac):**
```bash
# Find process
lsof -i :5432

# Kill process
kill -9 <PID>
```

### Issue: Database connection refused

**Solution:**
```bash
# Check PostgreSQL is running
docker-compose -f docker-compose.dev.yml ps postgres

# Check logs
docker-compose -f docker-compose.dev.yml logs postgres

# Restart PostgreSQL
docker-compose -f docker-compose.dev.yml restart postgres
```

### Issue: Out of memory

**Solution:**
```bash
# Increase Docker memory limit in Docker Desktop settings
# Recommended: 8GB minimum, 16GB ideal

# Or run only infrastructure
docker-compose -f docker-compose.dev.yml up -d

# Then run services individually
cd scholarship && mvn spring-boot:run
```

---

## Service URLs Reference

| Service | URL | Credentials |
|---------|-----|-------------|
| Keycloak Admin Console | http://localhost:8080 | admin / admin |
| Kafka UI | http://localhost:8089 | - |
| Kafka Connect REST API | http://localhost:8083 | - |
| Elasticsearch | http://localhost:9200 | - |
| PostgreSQL | localhost:5432 | admin / minh01672527656 |
| Redis | localhost:6379 | - |

---

## Additional Resources

- **Full Development Guide:** [docs/DEV_SETUP_GUIDE.md](docs/DEV_SETUP_GUIDE.md)
- **Deployment Guide:** [docs/DEPLOYMENT_GUIDE.md](docs/DEPLOYMENT_GUIDE.md)
- **Quality Management:** [docs/QUALITY_MANAGEMENT.md](docs/QUALITY_MANAGEMENT.md)
- **Quick Start (Vietnamese):** [docs/QUICK_START.md](docs/QUICK_START.md)

---

## Getting Help

1. Check service logs: `docker-compose -f docker-compose.dev.yml logs -f <service>`
2. Review this guide's troubleshooting section
3. Check Kafka UI for connector status: http://localhost:8089
4. Contact the development team

---

**Happy Coding! 🚀**
