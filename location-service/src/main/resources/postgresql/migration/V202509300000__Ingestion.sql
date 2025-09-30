INSERT INTO location.country (name, code_2, code3, is_billing_enabled, is_shipping_enabled, is_city_enabled, is_zip_code_enabled, is_district_enabled)
VALUES
    ('Vietnam', 'VN', 'VNM', TRUE, TRUE, TRUE, TRUE, TRUE),
    ('United States', 'US', 'USA', TRUE, TRUE, TRUE, TRUE, TRUE),
    ('Japan', 'JP', 'JPN', TRUE, TRUE, TRUE, TRUE, TRUE),
    ('Singapore', 'SG', 'SGP', TRUE, TRUE, TRUE, TRUE, TRUE),
    ('France', 'FR', 'FRA', TRUE, TRUE, TRUE, TRUE, TRUE);

INSERT INTO location.state_or_province (code, name, type, country_id)
VALUES
    ('HN', 'Hà Nội', 'Thành phố trực thuộc TW', 1),
    ('HCM', 'Hồ Chí Minh', 'Thành phố trực thuộc TW', 1),
    ('DN', 'Đà Nẵng', 'Thành phố trực thuộc TW', 1),
    ('BD', 'Bình Dương', 'Tỉnh', 1),
    ('HP', 'Hải Phòng', 'Thành phố trực thuộc TW', 1);

INSERT INTO location.state_or_province (code, name, type, country_id)
VALUES
    ('CA', 'California', 'State', 2),
    ('NY', 'New York', 'State', 2),
    ('TX', 'Texas', 'State', 2);

INSERT INTO location.state_or_province (code, name, type, country_id)
VALUES
    ('TK', 'Tokyo', 'Prefecture', 3),
    ('OS', 'Osaka', 'Prefecture', 3),
    ('KN', 'Kanagawa', 'Prefecture', 3);

INSERT INTO location.state_or_province (code, name, type, country_id)
VALUES
    ('SGP', 'Singapore', 'City-State', 4);

INSERT INTO location.state_or_province (code, name, type, country_id)
VALUES
    ('IDF', 'Île-de-France', 'Region', 5),
    ('PACA', 'Provence-Alpes-Côte Azur', 'Region', 5),
('NAQ', 'Nouvelle-Aquitaine', 'Region', 5);

INSERT INTO location.district (name, type, location, state_or_province_id)
VALUES
    ('Ba Đình', 'Quận', 'Hà Nội', 1),
    ('Hoàn Kiếm', 'Quận', 'Hà Nội', 1),
    ('Cầu Giấy', 'Quận', 'Hà Nội', 1);

INSERT INTO location.district (name, type, location, state_or_province_id)
VALUES
    ('Quận 1', 'Quận', 'Hồ Chí Minh', 2),
    ('Quận 3', 'Quận', 'Hồ Chí Minh', 2),
    ('Bình Thạnh', 'Quận', 'Hồ Chí Minh', 2);

INSERT INTO location.district (name, type, location, state_or_province_id)
VALUES
    ('Hải Châu', 'Quận', 'Đà Nẵng', 3),
    ('Sơn Trà', 'Quận', 'Đà Nẵng', 3),
    ('Ngũ Hành Sơn', 'Quận', 'Đà Nẵng', 3);

INSERT INTO location.district (name, type, location, state_or_province_id)
VALUES
    ('Los Angeles County', 'County', 'California', 6),
    ('San Diego County', 'County', 'California', 6),
    ('Orange County', 'County', 'California', 6);

INSERT INTO location.district (name, type, location, state_or_province_id)
VALUES
    ('New York City', 'City', 'New York', 7),
    ('Buffalo', 'City', 'New York', 7),
    ('Rochester', 'City', 'New York', 7);

INSERT INTO location.district (name, type, location, state_or_province_id)
VALUES
    ('Shinjuku', 'Ward', 'Tokyo', 9),
    ('Shibuya', 'Ward', 'Tokyo', 9),
    ('Chiyoda', 'Ward', 'Tokyo', 9);

INSERT INTO location.district (name, type, location, state_or_province_id)
VALUES
    ('Osaka City', 'City', 'Osaka', 10),
    ('Sakai', 'City', 'Osaka', 10);

INSERT INTO location.district (name, type, location, state_or_province_id)
VALUES
    ('Central Region', 'Region', 'Singapore', 12),
    ('East Region', 'Region', 'Singapore', 12),
    ('West Region', 'Region', 'Singapore', 12),
    ('North Region', 'Region', 'Singapore', 12),
    ('North-East Region', 'Region', 'Singapore', 12);

INSERT INTO location.district (name, type, location, state_or_province_id)
VALUES
    ('Paris', 'City', 'Île-de-France', 13),
    ('Versailles', 'City', 'Île-de-France', 13);

INSERT INTO location.district (name, type, location, state_or_province_id)
VALUES
    ('Marseille', 'City', 'PACA', 14),
    ('Nice', 'City', 'PACA', 14);
