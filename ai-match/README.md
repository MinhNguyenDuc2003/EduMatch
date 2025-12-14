# Scholarship Scoring API

Một hệ thống API đánh giá mức độ phù hợp giữa hồ sơ ứng viên và học bổng sử dụng LLM (Large Language Module) và Embedding.

## Tính năng
- So khớp hồ sơ ứng viên với học bổng thông qua phân tích ngữ nghĩa (semantic matching).
- API được xây dựng bằng **FastAPI** cho tốc độ cao và dễ dàng tích hợp.
- Hỗ trợ chạy trên Docker.

## Cài đặt và Chạy

### Cách 1: Chạy trực tiếp (Python)

1. Cài đặt môi trường:
```bash
python -m venv venv
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate
```

2. Cài đặt thư viện:
```bash
pip install -r requirements.txt
```

3. Chạy Server:
```bash
uvicorn api:app --reload
```
API sẽ chạy tại: `http://localhost:8000`
Tài liệu Swagger UI: `http://localhost:8000/docs`

### Cách 2: Chạy bằng Docker (Khuyên dùng)

1. Build và chạy container:
```bash
docker-compose up --build
```
Lần đầu chạy sẽ mất thời gian để tải các model AI (Phi-3, BGE-M3) về máy. Dữ liệu model sẽ được lưu cache trong Docker volume.

## Cấu trúc API

Truy cập `/docs` để xem chi tiết và test API.
- `POST /score/applications`: Chấm điểm danh sách ứng viên.
- `POST /score/scholarships`: Tìm kiếm học bổng cho một ứng viên.
- `POST /score/profiles`: Đánh giá nhiều hồ sơ ứng viên.

## Ghi chú về Phần cứng
Dự án sử dụng các model Deep Learning.
- Để đạt hiệu suất tốt nhất, khuyến nghị sử dụng máy có GPU (NVIDIA).
- Nếu chạy trên CPU, tốc độ suy luận (inference) sẽ chậm hơn.
