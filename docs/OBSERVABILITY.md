# EduMatch Observability Stack

## 📊 Overview

Hệ thống monitoring và observability đã được tích hợp vào `docker-compose.yml` với các thành phần:

- **Grafana** - Dashboard và visualization
- **Prometheus** - Metrics collection và storage
- **Loki** - Log aggregation
- **Tempo** - Distributed tracing
- **OpenTelemetry Collector** - Telemetry data collection

## 🌐 Access URLs

Sau khi chạy `docker-compose up`, bạn có thể truy cập các monitoring services qua:

| Service | URL | Description |
|---------|-----|-------------|
| **Grafana** | `https://api.edumatch.space/grafana/` | Main dashboard |
| **Prometheus** | `https://api.edumatch.space/prometheus/` | Metrics explorer |
| **Loki** | `https://api.edumatch.space/loki/` | Log API |
| **Tempo** | `https://api.edumatch.space/tempo/` | Trace API |

## 🚀 Quick Start

### 1. Khởi động tất cả services

```bash
docker-compose up -d
```

### 2. Kiểm tra health status

```bash
# Check collector
curl http://localhost:5555

# Check Prometheus
curl http://localhost:9090/-/healthy

# Check Grafana
curl http://localhost:3000/api/health

# Check Tempo
curl http://localhost:3200/status

# Check Loki
curl http://localhost:3100/ready
```

### 3. Truy cập Grafana

Mở browser và truy cập: `https://api.edumatch.space/grafana/`

- **Authentication**: Disabled (anonymous access enabled)
- **Default Role**: Admin

## 📁 Configuration Files

```
docker/
├── otel-collector/
│   └── otelcol-config.yml      # OpenTelemetry Collector config
├── prometheus/
│   └── prometheus.yml          # Prometheus scrape configs
├── tempo/
│   └── tempo-local.yaml        # Tempo storage config
└── grafana/
    └── provisioning/
        ├── datasources/
        │   └── datasources.yml # Auto-configured datasources
        └── dashboards/
            └── dashboards.yml  # Dashboard provider
```

## 🔧 How It Works

### Data Flow

```
Java Services (with OTEL Agent)
    ↓
    ↓ (OTLP gRPC/HTTP)
    ↓
OpenTelemetry Collector
    ↓
    ├─→ Tempo (Traces)
    ├─→ Prometheus (Metrics)
    └─→ Loki (Logs)
    ↓
Grafana (Visualization)
```

### OpenTelemetry Integration

Tất cả Java services đã được cấu hình với OpenTelemetry Java Agent:

```yaml
environment:
  - JAVA_TOOL_OPTIONS=-javaagent:opentelemetry-javaagent.jar
  - OTEL_EXPORTER_OTLP_ENDPOINT=http://collector:5555
  - OTEL_EXPORTER_OTLP_PROTOCOL=grpc
  - OTEL_LOGS_EXPORTER=otlp
  - OTEL_TRACES_EXPORTER=otlp
  - OTEL_METRICS_EXPORTER=otlp
  - OTEL_SERVICE_NAME=<service-name>
```

## 📊 Grafana Datasources

Grafana đã được cấu hình sẵn với 3 datasources:

1. **Prometheus** (Default)
   - URL: `http://prometheus:9090`
   - Metrics và exemplars

2. **Tempo**
   - URL: `http://tempo:3200`
   - Distributed tracing
   - Linked với Loki (traces → logs)
   - Linked với Prometheus (traces → metrics)

3. **Loki**
   - URL: `http://loki:3100`
   - Log aggregation
   - Linked với Tempo (logs → traces)

## 🔍 Querying Data

### Prometheus Queries

```promql
# Request rate per service
rate(http_server_requests_seconds_count[5m])

# Error rate
rate(http_server_requests_seconds_count{status=~"5.."}[5m])

# P95 latency
histogram_quantile(0.95, rate(http_server_requests_seconds_bucket[5m]))
```

### Loki Queries (LogQL)

```logql
# All logs from customer service
{service_name="customer-service"}

# Error logs
{service_name="customer-service"} |= "ERROR"

# Logs with trace ID
{service_name="customer-service"} | json | trace_id != ""
```

### Tempo Queries

- Search by Trace ID
- Search by service name
- Search by duration
- Search by tags

## 🎯 Service Names

| Service | OTEL_SERVICE_NAME |
|---------|-------------------|
| Customer | `customer-service` |
| Profile | `profile-service` |
| Media | `media-service` |
| Notification | `notification-service` |
| Subscription | `subscription-service` |
| Scholarship | `scholarship-service` |
| Search | `search-service` |
| Report | `report-service` |

## 🛠️ Troubleshooting

### Logs không hiển thị trong Loki

```bash
# Check collector logs
docker logs collector

# Check Loki logs
docker logs loki

# Verify OTLP endpoint
curl http://localhost:6666/v1/logs
```

### Traces không hiển thị trong Tempo

```bash
# Check Tempo health
curl http://localhost:3200/status

# Check collector → Tempo connection
docker logs collector | grep tempo
```

### Metrics không hiển thị trong Prometheus

```bash
# Check Prometheus targets
curl http://localhost:9090/api/v1/targets

# Check collector metrics endpoint
curl http://localhost:8889/metrics
```

## 📝 Environment Variables

Các biến môi trường quan trọng trong `.env`:

```env
# OpenTelemetry Collector
OTEL_COLLECTOR_HOST=collector
OTEL_COLLECTOR_PORT_GRPC=5555
OTEL_COLLECTOR_PORT_HTTP=6666

# Exporters
OTEL_EXPORTER_OTLP_ENDPOINT=http://collector:5555
OTEL_EXPORTER_OTLP_PROTOCOL=grpc
OTEL_LOGS_EXPORTER=otlp
OTEL_TRACES_EXPORTER=otlp
OTEL_METRICS_EXPORTER=otlp

# Java Agent
JAVA_TOOL_OPTIONS=-javaagent:opentelemetry-javaagent.jar
OTEL_JAVAAGENT_ENABLED=true

# Prometheus
PROMETHEUS_SERVICE_HOST=prometheus
PROMETHEUS_SERVICE_PORT=9090
```

## 🎨 Creating Dashboards

### Import Pre-built Dashboards

1. Truy cập Grafana: `https://api.edumatch.space/grafana/`
2. Click **+** → **Import**
3. Nhập dashboard ID hoặc upload JSON:
   - **Spring Boot 2.1 Statistics**: `10280`
   - **JVM (Micrometer)**: `4701`
   - **Loki Dashboard**: `13639`

### Create Custom Dashboard

1. Click **+** → **Dashboard**
2. Add Panel
3. Select datasource (Prometheus/Loki/Tempo)
4. Write query
5. Configure visualization
6. Save dashboard

## 🔐 Security Notes

> [!WARNING]
> Grafana authentication đã bị tắt cho môi trường development. Trong production, nên:
> - Bật authentication: `GF_AUTH_ANONYMOUS_ENABLED=false`
> - Cấu hình OAuth/LDAP
> - Sử dụng HTTPS
> - Giới hạn network access

## 📚 Additional Resources

- [OpenTelemetry Documentation](https://opentelemetry.io/docs/)
- [Grafana Documentation](https://grafana.com/docs/)
- [Prometheus Query Examples](https://prometheus.io/docs/prometheus/latest/querying/examples/)
- [LogQL Documentation](https://grafana.com/docs/loki/latest/logql/)
- [Tempo Documentation](https://grafana.com/docs/tempo/latest/)
