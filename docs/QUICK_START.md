# EduMatch - Hướng dẫn triển khai

## 📋 Yêu cầu
- Docker và Docker Compose đã cài đặt
- RAM tối thiểu: 8GB (khuyến nghị 16GB)

---

## 🚀 Triển khai Local (Development)

### Bước 1: Cấu hình môi trường

```bash
# Sao chép file cấu hình
cp .env.example .env
```

**Chỉnh sửa `.env` - Các biến quan trọng:**

```bash
# Database
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin123

# AWS S3 (cho upload file)
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_DEFAULT_REGION=ap-southeast-1
AWS_BUCKET_NAME=edumatch

# Google Gemini AI (cho AI matching)
GOOGLE_GENAI_API_KEY=your_gemini_api_key
```

### Bước 2: Khởi động

```bash
# Chạy tất cả services
docker-compose up -d

# Xem logs (nếu cần)
docker-compose logs -f
```

### Bước 3: Truy cập ứng dụng

| Service | URL |
|---------|-----|
| **Student Portal** | http://localhost/edufront |
| **Admin Dashboard** | http://localhost/backoffice |
| **Swagger UI** | http://localhost/swagger-ui |
| **Kafka UI** | http://localhost:8089 |

#### Swagger API Endpoints:

```
Customer API:      http://localhost/customer/v3/api-docs
Profile API:       http://localhost/profile/v3/api-docs
Scholarship API:   http://localhost/scholarship/v3/api-docs
Search API:        http://localhost/search/v3/api-docs
Media API:         http://localhost/media/v3/api-docs
Notification API:  http://localhost/notification/v3/api-docs
Subscription API:  http://localhost/subscription/v3/api-docs
Report API:        http://localhost/report/v3/api-docs
Payment API:       http://localhost/payment/v3/api-docs
```

### Dừng ứng dụng

```bash
docker-compose down
```

---

## 🌐 Triển khai Production (Deploy)

### Bước 1: Cấu hình môi trường

**Tạo file `.env` với cấu hình production:**

```bash
# Platform
ENV_PLATFORM=production

# Database - ⚠️ ĐỔI MẬT KHẨU MẠNH
POSTGRES_USER=admin
POSTGRES_PASSWORD=YOUR_STRONG_PASSWORD_HERE
POSTGRES_HOST=postgres
POSTGRES_PORT=5432

# Kafka
KAFKA_SERVICE_HOST=kafka
KAFKA_SERVICE_PORT=9092
KAFKA_BROKER_ID=1
KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181
KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://kafka:9092,PLAINTEXT_HOST://kafka:29092
KAFKA_LISTENER_SECURITY_PROTOCOL_MAP=PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT
KAFKA_INTER_BROKER_LISTENER_NAME=PLAINTEXT
KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1

# Redis
SPRING_DATA_REDIS_HOST=redis
SPRING_DATA_REDIS_PORT=6379

# AWS S3 - ⚠️ THAY BẰNG CREDENTIALS THẬT
AWS_ACCESS_KEY_ID=YOUR_AWS_ACCESS_KEY
AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_KEY
AWS_DEFAULT_REGION=ap-southeast-1
AWS_BUCKET_NAME=edumatch

# Google Gemini AI - ⚠️ THAY BẰNG API KEY THẬT
GOOGLE_GENAI_API_KEY=YOUR_GEMINI_API_KEY

# AI Matching
EMBEDDING_MODEL_NAME=all-MiniLM-L6-v2
APP_NAME=AI Match API
APP_VERSION=1.0.0
DEBUG=false

# Database cho AI service
SCHOLARSHIP_DB_HOST=postgres
SCHOLARSHIP_DB_PORT=5432
SCHOLARSHIP_DB_NAME=scholarship
SCHOLARSHIP_DB_USER=admin
SCHOLARSHIP_DB_PASSWORD=YOUR_STRONG_PASSWORD_HERE

PROFILE_DB_HOST=postgres
PROFILE_DB_PORT=5432
PROFILE_DB_NAME=profile
PROFILE_DB_USER=admin
PROFILE_DB_PASSWORD=YOUR_STRONG_PASSWORD_HERE

# Java
JAVA_TOOL_OPTIONS=-javaagent:opentelemetry-javaagent.jar
LOGGING_CONFIG=/app-config/logback-spring.xml

# Swagger URLs - ⚠️ ĐỔI DOMAIN
URLS=[{ url: 'https://api.yourdomain.com/customer/v3/api-docs', name: 'Customer' },{ url: 'https://api.yourdomain.com/profile/v3/api-docs', name: 'Profile'},{ url: 'https://api.yourdomain.com/media/v3/api-docs', name: 'Media'},{ url: 'https://api.yourdomain.com/notification/v3/api-docs', name: 'Notification'},{ url: 'https://api.yourdomain.com/scholarship/v3/api-docs', name: 'Scholarship'},{ url: 'https://api.yourdomain.com/search/v3/api-docs', name: 'Search'},{ url: 'https://api.yourdomain.com/subscription/v3/api-docs', name: 'Subscription'},{ url: 'https://api.yourdomain.com/report/v3/api-docs', name: 'Report'}]
```

### Bước 2: Khởi động

```bash
# Pull images từ registry
docker-compose pull

# Khởi động tất cả services
docker-compose up -d

# Kiểm tra trạng thái
docker-compose ps
```

### Bước 3: Truy cập ứng dụng

| Service | URL Production |
|---------|----------------|
| **Student Portal** | https://yourdomain.com/edufront |
| **Admin Dashboard** | https://yourdomain.com/backoffice |
| **Swagger UI** | https://api.yourdomain.com/swagger-ui |

#### Swagger API Endpoints:

```
Customer API:      https://api.yourdomain.com/customer/v3/api-docs
Profile API:       https://api.yourdomain.com/profile/v3/api-docs
Scholarship API:   https://api.yourdomain.com/scholarship/v3/api-docs
Search API:        https://api.yourdomain.com/search/v3/api-docs
Media API:         https://api.yourdomain.com/media/v3/api-docs
Notification API:  https://api.yourdomain.com/notification/v3/api-docs
Subscription API:  https://api.yourdomain.com/subscription/v3/api-docs
Report API:        https://api.yourdomain.com/report/v3/api-docs
Payment API:       https://api.yourdomain.com/payment/v3/api-docs
```

---

## 📝 Lưu ý quan trọng

### Local Development
- ✅ Sử dụng mật khẩu đơn giản (admin123)
- ✅ Không cần SSL/TLS
- ✅ Có thể dùng AWS credentials test

### Production Deploy
- ⚠️ **BẮT BUỘC** đổi mật khẩu mạnh
- ⚠️ **BẮT BUỘC** dùng AWS credentials thật
- ⚠️ **BẮT BUỘC** dùng Google Gemini API key thật
- ⚠️ **BẮT BUỘC** cấu hình SSL/TLS cho NGINX
- ⚠️ **BẮT BUỘC** đổi domain trong biến URLS

---

## 🔧 Các lệnh hữu ích

```bash
# Xem logs
docker-compose logs -f

# Xem logs của service cụ thể
docker-compose logs -f scholarship

# Restart service
docker-compose restart scholarship

# Dừng tất cả
docker-compose down

# Dừng và xóa data (⚠️ Cẩn thận!)
docker-compose down -v
```

---

## ❓ Xử lý sự cố

**Container không chạy:**
```bash
docker-compose logs <service-name>
```

**Port bị conflict:**
```bash
# Windows
netstat -ano | findstr :5432

# Linux/Mac
lsof -i :5432
```

**Hết RAM:**
```bash
# Chỉ chạy infrastructure
docker-compose -f docker-compose.dev.yml up -d
```

---

**Chúc bạn triển khai thành công! 🚀**
