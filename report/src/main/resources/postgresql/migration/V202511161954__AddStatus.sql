-- Thêm cột status vào bảng report.reports
ALTER TABLE report.reports
ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'PENDING';
