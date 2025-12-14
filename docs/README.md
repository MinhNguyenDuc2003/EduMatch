# EduMatch Release Package

This directory contains comprehensive documentation for deploying and using the EduMatch scholarship management platform.

## 📚 Documentation

### For Deployment Teams

- **[QUICK_START.md](QUICK_START.md)** - ⚡ **Bắt đầu nhanh** - Chỉ cần docker-compose + .env (Khuyến nghị)
- **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Hướng dẫn chi tiết (English)
  - Prerequisites and system requirements
  - Quick start guide
  - Architecture overview
  - Configuration management
  - Service management
  - Monitoring and health checks
  - Troubleshooting
  - Backup and recovery
  - Security best practices

### For End Users

- **[USER_GUIDE.md](USER_GUIDE.md)** - Comprehensive user documentation
  - System overview
  - Getting started
  - User roles and permissions
  - Student portal features
  - Admin dashboard features
  - API documentation
  - Common operations
  - Mobile application guide
  - Support and troubleshooting

### For Release Management

- **[RELEASE_NOTES.md](RELEASE_NOTES.md)** - Version history and changes
  - Current version features
  - Improvements and bug fixes
  - Migration guides
  - Breaking changes
  - Known issues
  - Upcoming features

### Additional Documentation

- **[TESTING_GUIDE.md](TESTING_GUIDE.md)** - Testing procedures and strategies
- **[API_CONVENTIONS.md](API_CONVENTIONS.md)** - API design standards
- **[QUALITY_MANAGEMENT.md](QUALITY_MANAGEMENT.md)** - Quality assurance processes

## 🚀 Quick Start

### Prerequisites

- Docker 20.10+
- Docker Compose 2.0+
- 8GB RAM minimum (16GB recommended)
- 50GB free disk space

### Installation Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd EduMatch
```

2. **Configure environment**
```bash
cp .env.example .env
# Edit .env with your configuration
nano .env
```

3. **Start the platform**
```bash
# Development mode
docker-compose -f docker-compose.dev.yml up -d

# Production mode
docker-compose up -d
```

4. **Access the application**
- Student Portal: http://localhost/edufront
- Admin Dashboard: http://localhost/backoffice
- API Docs: http://localhost/swagger-ui

## 📦 What's Included

### Microservices

| Service | Technology | Purpose |
|---------|-----------|---------|
| **nginx** | NGINX 1.27.2 | Reverse proxy |
| **swagger-ui** | Swagger UI 5.17.14 | API documentation |
| **identity** | Keycloak 26.0.2 | Authentication (SSO) |
| **registry-server** | Spring Cloud Eureka | Service discovery |
| **customer** | Spring Boot | Account management |
| **profile** | Spring Boot | Profile management |
| **scholarship** | Spring Boot | Scholarship CRUD |
| **search** | Spring Boot | Search service |
| **media** | Spring Boot | File management |
| **notification** | Spring Boot | Email service |
| **subscription** | Spring Boot | Subscriptions |
| **report** | Spring Boot | Report generation |
| **payment** | Spring Boot | Payment processing |
| **ai-match** | Python FastAPI | AI matching |
| **edufront-nextjs** | Next.js | Student portal |
| **backoffice-nextjs** | Next.js | Admin dashboard |

### Infrastructure

| Service | Technology | Purpose |
|---------|-----------|---------|
| **postgres** | PostgreSQL 16 | Database |
| **redis** | Redis 7.4 | Cache |
| **elasticsearch** | Elasticsearch 8.6 | Search engine |
| **kafka** | Kafka 7.7 | Event streaming |
| **zookeeper** | Zookeeper 2.7 | Kafka coordination |
| **kafka-connect** | Debezium 2.7 | CDC connector |
| **kafka-ui** | Kafka UI | Kafka management |

## 🔧 Configuration

### Environment Variables

Key configuration in `.env` file:

```bash
# Database
POSTGRES_USER=admin
POSTGRES_PASSWORD=<secure-password>

# AWS S3 (for file storage)
AWS_ACCESS_KEY_ID=<your-key>
AWS_SECRET_ACCESS_KEY=<your-secret>

# AI Service
GOOGLE_GENAI_API_KEY=<your-api-key>
```

See [.env.example](.env.example) for complete configuration options.

### Docker Compose Files

- `docker-compose.yml` - Production deployment
- `docker-compose.dev.yml` - Development environment
- `docker-compose.backoffice.yml` - Backoffice only
- `docker-compose.edufront.yml` - EduFront only

## 📖 Documentation Structure

```
docs/
├── DEPLOYMENT_GUIDE.md      # Deployment instructions
├── USER_GUIDE.md            # User documentation
├── RELEASE_NOTES.md         # Version history
├── TESTING_GUIDE.md         # Testing procedures
├── API_CONVENTIONS.md       # API standards
└── QUALITY_MANAGEMENT.md    # QA processes
```

## 🆘 Getting Help

### Support Channels

- **Email**: support@edumatch.space
- **Documentation**: See guides in this directory
- **Issues**: Report bugs via issue tracker

### Common Issues

1. **Services won't start**: Check `docker-compose logs <service>`
2. **Database connection errors**: Verify PostgreSQL is running
3. **Port conflicts**: Check ports in docker-compose.yml
4. **Out of memory**: Increase Docker memory limits

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md#troubleshooting) for detailed troubleshooting.

## 🔒 Security

### Before Production Deployment

- [ ] Change all default passwords
- [ ] Configure SSL/TLS certificates
- [ ] Set up firewall rules
- [ ] Enable automated backups
- [ ] Configure monitoring
- [ ] Review security settings
- [ ] Test disaster recovery

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md#security-best-practices) for complete security checklist.

## 📊 Monitoring

### Health Checks

```bash
# Check all services
docker-compose ps

# View logs
docker-compose logs -f

# Check specific service
docker-compose logs -f scholarship
```

### Endpoints

- Health: `http://localhost/<service>/actuator/health`
- Metrics: `http://localhost/<service>/actuator/metrics`
- Kafka UI: `http://localhost:8089`

## 🔄 Updates

### Updating Services

```bash
# Pull latest images
docker-compose pull

# Restart with new images
docker-compose up -d --force-recreate
```

See [RELEASE_NOTES.md](RELEASE_NOTES.md) for migration guides.

## 📝 Version Information

- **Current Version**: 1.1.0
- **Release Date**: December 2025
- **Supported Platforms**: Linux, Windows (WSL2), macOS

## 📄 License

See LICENSE file for details.

---

**For detailed information, please refer to the specific documentation files listed above.**

**Last Updated**: December 2025
