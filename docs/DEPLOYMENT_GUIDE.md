# EduMatch Deployment Guide

## Table of Contents
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Architecture Overview](#architecture-overview)
- [Configuration](#configuration)
- [Deployment Modes](#deployment-modes)
- [Service Management](#service-management)
- [Monitoring & Health Checks](#monitoring--health-checks)
- [Troubleshooting](#troubleshooting)
- [Backup & Recovery](#backup--recovery)
- [Security Best Practices](#security-best-practices)

---

## Prerequisites

### Required Software
- **Docker**: Version 20.10 or higher
- **Docker Compose**: Version 2.0 or higher
- **Git**: For cloning the repository

### System Requirements

#### Minimum Requirements
- **CPU**: 4 cores
- **RAM**: 8 GB
- **Disk Space**: 50 GB free space
- **OS**: Linux (Ubuntu 20.04+), Windows 10/11 with WSL2, macOS 11+

#### Recommended for Production
- **CPU**: 8+ cores
- **RAM**: 16+ GB
- **Disk Space**: 100+ GB SSD
- **Network**: Stable internet connection for external services (AWS S3, etc.)

### External Services
- **AWS Account**: For S3 storage (media files, reports)
- **Domain Name**: For production deployment with SSL/TLS
- **SSL Certificates**: Let's Encrypt or commercial certificates

---

## Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd EduMatch
```

### 2. Configure Environment Variables
```bash
# Copy the example environment file
cp .env.example .env

# Edit the .env file with your configuration
nano .env
```

### 3. Start Development Environment
```bash
# Start infrastructure services only
docker-compose -f docker-compose.dev.yml up -d

# Wait for services to be healthy (30-60 seconds)
docker-compose -f docker-compose.dev.yml ps
```

### 4. Build and Start All Services (Production)
```bash
# Pull pre-built images from registry
docker-compose pull

# Start all services
docker-compose up -d

# Check service status
docker-compose ps
```

### 5. Access the Application
- **EduFront (Student Portal)**: http://localhost/edufront
- **Backoffice (Admin Portal)**: http://localhost/backoffice
- **API Documentation**: http://localhost/swagger-ui
- **Keycloak (Identity)**: http://localhost/identity
- **Kafka UI**: http://localhost:8089

---

## Architecture Overview

### Microservices Architecture

EduMatch is built using a microservices architecture with the following components:

```
┌─────────────────────────────────────────────────────────────┐
│                         NGINX (Reverse Proxy)                │
│                    Ports: 80 (HTTP), 443 (HTTPS)            │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
┌───────▼────────┐   ┌────────▼────────┐   ┌───────▼────────┐
│  EduFront      │   │   Backoffice    │   │  Swagger UI    │
│  (Next.js)     │   │   (Next.js)     │   │                │
└────────────────┘   └─────────────────┘   └────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
┌───────▼────────┐   ┌────────▼────────┐   ┌───────▼────────┐
│  Identity      │   │  Registry       │   │  API Gateway   │
│  (Keycloak)    │   │  (Eureka)       │   │                │
└────────────────┘   └─────────────────┘   └────────────────┘
                              │
        ┌─────────────────────┴─────────────────────┐
        │              Microservices                 │
        ├────────────────────────────────────────────┤
        │ • Customer      • Profile    • Media       │
        │ • Scholarship   • Search     • Notification│
        │ • Subscription  • Report     • Payment     │
        │ • AI Match (Python FastAPI)                │
        └────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
┌───────▼────────┐   ┌────────▼────────┐   ┌───────▼────────┐
│  PostgreSQL    │   │     Redis       │   │  Elasticsearch │
│  (Database)    │   │    (Cache)      │   │    (Search)    │
└────────────────┘   └─────────────────┘   └────────────────┘
                              │
        ┌─────────────────────┴─────────────────────┐
        │                                           │
┌───────▼────────┐   ┌─────────────────┐   ┌───────▼────────┐
│  Kafka         │   │  Zookeeper      │   │  Kafka Connect │
│  (Event Bus)   │   │                 │   │  (Debezium)    │
└────────────────┘   └─────────────────┘   └────────────────┘
```

### Service Descriptions

| Service | Technology | Port(s) | Purpose |
|---------|-----------|---------|---------|
| **nginx** | NGINX 1.27.2 | 80, 443 | Reverse proxy and load balancer |
| **swagger-ui** | Swagger UI 5.17.14 | - | API documentation interface |
| **identity** | Keycloak 26.0.2 | - | Authentication and authorization (SSO) |
| **postgres** | PostgreSQL 16 (Debezium) | 5432 | Primary database for all services |
| **redis** | Redis 7.4.1 | - | Caching and session storage |
| **registry-server** | Spring Cloud Eureka | - | Service discovery and registration |
| **customer** | Spring Boot 3.3.5 | - | Customer account management |
| **profile** | Spring Boot 3.3.5 | - | Student profile management |
| **media** | Spring Boot 3.3.5 | - | File upload/download and AWS S3 integration |
| **notification** | Spring Boot 3.3.5 | - | Email notification service |
| **subscription** | Spring Boot 3.3.5 | - | Subscription and payment management |
| **scholarship** | Spring Boot 3.3.5 | - | Scholarship CRUD operations |
| **search** | Spring Boot 3.3.5 | - | Search service with Elasticsearch |
| **report** | Spring Boot 3.3.5 | - | Report generation and export |
| **payment** | Spring Boot 3.3.5 | - | Payment processing (PayPal, Stripe) |
| **ai-match** | Python FastAPI | - | AI-powered scholarship matching |
| **backoffice-nextjs** | Next.js 14 | - | Admin dashboard frontend |
| **edufront-nextjs** | Next.js 14 | - | Student portal frontend |
| **zookeeper** | Debezium Zookeeper 2.7.3 | 2181, 2888, 3888 | Kafka cluster coordination |
| **kafka** | Confluent Kafka 7.7.1 | 9092, 29092 | Event streaming platform |
| **kafka-connect** | Debezium Connect 2.7.3 | 8083, 5005 | CDC (Change Data Capture) connector |
| **kafka-ui** | Kafka UI (latest) | 8089 | Kafka management interface |
| **elasticsearch** | Elasticsearch 8.6.2 | 9200, 9300 | Full-text search engine |

---

## Configuration

### Environment Variables

The `.env` file contains all configuration for the EduMatch platform. Key sections include:

#### Database Configuration
```bash
POSTGRES_USER=admin
POSTGRES_PASSWORD=<your-secure-password>
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
```

#### Kafka Configuration
```bash
KAFKA_SERVICE_HOST=kafka
KAFKA_SERVICE_PORT=9092
KAFKA_BROKER_ID=1
KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181
```

#### Redis Configuration
```bash
SPRING_DATA_REDIS_HOST=redis
SPRING_DATA_REDIS_PORT=6379
```

#### AWS Configuration (for S3 storage)
```bash
AWS_ACCESS_KEY_ID=<your-access-key>
AWS_SECRET_ACCESS_KEY=<your-secret-key>
AWS_DEFAULT_REGION=ap-southeast-1
AWS_BUCKET_NAME=edumatch
```

#### AI Service Configuration
```bash
# Google Gemini API for AI matching
GOOGLE_GENAI_API_KEY=<your-gemini-api-key>

# Embedding model for similarity search
EMBEDDING_MODEL_NAME=all-MiniLM-L6-v2
```

#### OpenTelemetry (Observability)
```bash
OTEL_EXPORTER_OTLP_ENDPOINT=http://collector:5555
OTEL_JAVAAGENT_ENABLED=true
JAVA_TOOL_OPTIONS=-javaagent:opentelemetry-javaagent.jar
```

### Secrets Management

> **⚠️ IMPORTANT**: Never commit sensitive credentials to version control!

For production deployments:

1. **Use Docker Secrets** (Docker Swarm):
```bash
echo "your-password" | docker secret create postgres_password -
```

2. **Use External Secret Management**:
   - AWS Secrets Manager
   - HashiCorp Vault
   - Azure Key Vault

3. **Environment-specific .env files**:
```bash
.env.development
.env.staging
.env.production  # Never commit this file!
```

### SSL/TLS Configuration

For production with HTTPS:

1. **Obtain SSL Certificates**:
```bash
# Using Let's Encrypt
sudo certbot certonly --standalone -d api.edumatch.space
```

2. **Mount certificates in docker-compose.yml**:
```yaml
nginx:
  volumes:
    - /etc/letsencrypt:/etc/letsencrypt:ro
```

3. **Configure NGINX** to use certificates (see `nginx/templates/` directory)

---

## Deployment Modes

### Development Mode

For local development with hot-reload and debugging:

```bash
# Start infrastructure only (DB, Kafka, Redis, etc.)
docker-compose -f docker-compose.dev.yml up -d

# Run microservices locally with your IDE
# Each service can be started individually for debugging
```

**Features**:
- Exposed ports for direct access
- Debug ports enabled
- No resource limits
- Development-friendly logging

### Production Mode

For production deployment with all services containerized:

```bash
# Pull latest images
docker-compose pull

# Start all services
docker-compose up -d

# Monitor logs
docker-compose logs -f
```

**Features**:
- Pre-built Docker images from registry
- NGINX reverse proxy
- SSL/TLS termination
- Production logging configuration

---

## Service Management

### Starting Services

```bash
# Start all services
docker-compose up -d

# Start specific services
docker-compose up -d postgres redis kafka

# Start with build (if using local Dockerfiles)
docker-compose up -d --build
```

### Stopping Services

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (⚠️ deletes data!)
docker-compose down -v

# Stop specific service
docker-compose stop scholarship
```

### Viewing Logs

```bash
# View all logs
docker-compose logs

# Follow logs in real-time
docker-compose logs -f

# View logs for specific service
docker-compose logs -f scholarship

# View last 100 lines
docker-compose logs --tail=100 ai-match
```

### Restarting Services

```bash
# Restart all services
docker-compose restart

# Restart specific service
docker-compose restart notification

# Restart with rebuild
docker-compose up -d --build --force-recreate scholarship
```

### Updating Services

```bash
# Pull latest images
docker-compose pull

# Recreate containers with new images
docker-compose up -d --force-recreate

# Update specific service
docker-compose pull scholarship
docker-compose up -d --force-recreate scholarship
```

---

## Monitoring & Health Checks

### Service Health Status

```bash
# Check all services status
docker-compose ps

# Check specific service health
docker inspect --format='{{.State.Health.Status}}' edumatch-postgres
```

### Database Health

```bash
# Connect to PostgreSQL
docker-compose exec postgres psql -U admin -d scholarship

# Check database size
docker-compose exec postgres psql -U admin -c "\l+"

# Check active connections
docker-compose exec postgres psql -U admin -c "SELECT count(*) FROM pg_stat_activity;"
```

### Kafka Health

```bash
# Access Kafka UI
# Navigate to http://localhost:8089

# List Kafka topics
docker-compose exec kafka kafka-topics --list --bootstrap-server localhost:9092

# Check consumer groups
docker-compose exec kafka kafka-consumer-groups --list --bootstrap-server localhost:9092
```

### Elasticsearch Health

```bash
# Check cluster health
curl http://localhost:9200/_cluster/health?pretty

# List indices
curl http://localhost:9200/_cat/indices?v
```

### Redis Health

```bash
# Connect to Redis CLI
docker-compose exec redis redis-cli

# Check memory usage
docker-compose exec redis redis-cli INFO memory

# Monitor commands in real-time
docker-compose exec redis redis-cli MONITOR
```

### Application Logs

All Java microservices expose actuator endpoints:

```bash
# Health endpoint
curl http://localhost/scholarship/actuator/health

# Metrics endpoint
curl http://localhost/scholarship/actuator/metrics

# Info endpoint
curl http://localhost/scholarship/actuator/info
```

---

## Troubleshooting

### Common Issues

#### 1. Services Won't Start

**Problem**: Container exits immediately after starting

**Solution**:
```bash
# Check logs for error messages
docker-compose logs <service-name>

# Check if required environment variables are set
docker-compose config

# Verify network connectivity
docker network ls
docker network inspect m-network
```

#### 2. Database Connection Errors

**Problem**: Services can't connect to PostgreSQL

**Solution**:
```bash
# Ensure PostgreSQL is running
docker-compose ps postgres

# Check PostgreSQL logs
docker-compose logs postgres

# Verify database exists
docker-compose exec postgres psql -U admin -l

# Test connection from service
docker-compose exec scholarship nc -zv postgres 5432
```

#### 3. Out of Memory Errors

**Problem**: Services crash with OOM errors

**Solution**:
```bash
# Check Docker resource limits
docker stats

# Increase memory for specific service in docker-compose.yml:
# deploy:
#   resources:
#     limits:
#       memory: 2G

# Increase JVM heap size for Java services
# ENV JAVA_OPTS="-Xmx1024m -Xms512m"
```

#### 4. Port Conflicts

**Problem**: Port already in use

**Solution**:
```bash
# Find process using port
# Windows
netstat -ano | findstr :5432

# Linux/Mac
lsof -i :5432

# Change port mapping in docker-compose.yml or stop conflicting service
```

#### 5. Kafka Connection Issues

**Problem**: Services can't connect to Kafka

**Solution**:
```bash
# Ensure Zookeeper is running first
docker-compose up -d zookeeper
sleep 10

# Then start Kafka
docker-compose up -d kafka

# Verify Kafka is listening
docker-compose exec kafka nc -zv localhost 9092
```

#### 6. Slow Performance

**Problem**: Application is slow or unresponsive

**Solution**:
```bash
# Check resource usage
docker stats

# Check database performance
docker-compose exec postgres psql -U admin -c "SELECT * FROM pg_stat_activity;"

# Clear Redis cache
docker-compose exec redis redis-cli FLUSHALL

# Restart services
docker-compose restart
```

### Getting Help

If you encounter issues not covered here:

1. Check service logs: `docker-compose logs -f <service>`
2. Review environment variables: `docker-compose config`
3. Verify network connectivity: `docker network inspect m-network`
4. Check disk space: `df -h`
5. Review Docker daemon logs

---

## Backup & Recovery

### Database Backup

#### Manual Backup

```bash
# Backup all databases
docker-compose exec postgres pg_dumpall -U admin > backup_$(date +%Y%m%d_%H%M%S).sql

# Backup specific database
docker-compose exec postgres pg_dump -U admin scholarship > scholarship_backup.sql

# Backup with compression
docker-compose exec postgres pg_dump -U admin scholarship | gzip > scholarship_backup.sql.gz
```

#### Automated Backup Script

Create a backup script `backup.sh`:

```bash
#!/bin/bash
BACKUP_DIR="/backups"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup PostgreSQL
docker-compose exec -T postgres pg_dumpall -U admin | gzip > $BACKUP_DIR/postgres_$DATE.sql.gz

# Backup volumes
docker run --rm -v edumatch_postgres:/data -v $BACKUP_DIR:/backup alpine tar czf /backup/postgres_volume_$DATE.tar.gz -C /data .

# Keep only last 7 days of backups
find $BACKUP_DIR -name "*.gz" -mtime +7 -delete

echo "Backup completed: $DATE"
```

#### Restore from Backup

```bash
# Stop services
docker-compose down

# Restore database
gunzip -c backup.sql.gz | docker-compose exec -T postgres psql -U admin

# Restart services
docker-compose up -d
```

### Volume Backup

```bash
# Backup PostgreSQL volume
docker run --rm -v edumatch_postgres:/data -v $(pwd):/backup alpine tar czf /backup/postgres_volume.tar.gz -C /data .

# Backup Redis volume
docker run --rm -v edumatch_redis:/data -v $(pwd):/backup alpine tar czf /backup/redis_volume.tar.gz -C /data .

# Backup Elasticsearch volume
docker run --rm -v edumatch_esdata:/data -v $(pwd):/backup alpine tar czf /backup/elasticsearch_volume.tar.gz -C /data .
```

### Disaster Recovery

1. **Stop all services**:
```bash
docker-compose down
```

2. **Restore volumes**:
```bash
docker run --rm -v edumatch_postgres:/data -v $(pwd):/backup alpine tar xzf /backup/postgres_volume.tar.gz -C /data
```

3. **Restore database**:
```bash
docker-compose up -d postgres
gunzip -c backup.sql.gz | docker-compose exec -T postgres psql -U admin
```

4. **Start all services**:
```bash
docker-compose up -d
```

---

## Security Best Practices

### 1. Secure Credentials

- ✅ Use strong, unique passwords for all services
- ✅ Store credentials in environment variables or secret management systems
- ✅ Never commit `.env` files to version control
- ✅ Rotate credentials regularly (every 90 days)
- ✅ Use Docker secrets for sensitive data in production

### 2. Network Security

- ✅ Use internal Docker networks for service communication
- ✅ Only expose necessary ports to the host
- ✅ Implement NGINX rate limiting
- ✅ Use SSL/TLS for all external communications
- ✅ Configure firewall rules (UFW, iptables)

### 3. Container Security

- ✅ Run containers as non-root users
- ✅ Use official base images from trusted sources
- ✅ Keep images updated with security patches
- ✅ Scan images for vulnerabilities (Trivy, Snyk)
- ✅ Limit container resources (CPU, memory)

### 4. Database Security

- ✅ Use strong database passwords
- ✅ Limit database access to internal network only
- ✅ Enable SSL for database connections
- ✅ Regular security updates
- ✅ Implement database backup encryption

### 5. Application Security

- ✅ Enable Keycloak authentication for all services
- ✅ Implement API rate limiting
- ✅ Use HTTPS for all external APIs
- ✅ Validate and sanitize all inputs
- ✅ Keep dependencies updated

### 6. Monitoring & Auditing

- ✅ Enable audit logging for all services
- ✅ Monitor for suspicious activities
- ✅ Set up alerts for security events
- ✅ Regular security audits
- ✅ Implement log retention policies

### 7. Production Checklist

Before deploying to production:

- [ ] Change all default passwords
- [ ] Configure SSL/TLS certificates
- [ ] Set up automated backups
- [ ] Configure monitoring and alerting
- [ ] Review and harden NGINX configuration
- [ ] Enable firewall rules
- [ ] Set up log aggregation
- [ ] Configure resource limits
- [ ] Test disaster recovery procedures
- [ ] Document runbooks and procedures

---

## Additional Resources

- **Docker Documentation**: https://docs.docker.com/
- **Docker Compose Reference**: https://docs.docker.com/compose/
- **Spring Boot Documentation**: https://spring.io/projects/spring-boot
- **Keycloak Documentation**: https://www.keycloak.org/documentation
- **Kafka Documentation**: https://kafka.apache.org/documentation/
- **PostgreSQL Documentation**: https://www.postgresql.org/docs/

---

**Last Updated**: December 2025  
**Version**: 1.0.0
