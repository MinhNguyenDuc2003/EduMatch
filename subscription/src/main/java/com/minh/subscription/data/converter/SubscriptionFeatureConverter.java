package com.minh.subscription.data.converter;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.minh.enumeration.subscription.SubscriptionFeatureEnum;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Converter(autoApply = true)
public class SubscriptionFeatureConverter implements AttributeConverter<List<SubscriptionFeatureEnum>, String> {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(List<SubscriptionFeatureEnum> attribute) {
        try {
            if (attribute == null || attribute.isEmpty()) {
                return "[]";
            }
            // Lưu danh sách enum dưới dạng chuỗi JSON, ví dụ ["FEATURE_A", "FEATURE_B"]
            List<String> enumNames = attribute.stream()
                    .map(Enum::name)
                    .collect(Collectors.toList());
            return objectMapper.writeValueAsString(enumNames);
        } catch (Exception e) {
            throw new IllegalArgumentException("Error converting enum list to JSON", e);
        }
    }

    @Override
    public List<SubscriptionFeatureEnum> convertToEntityAttribute(String dbData) {
        try {
            if (dbData == null || dbData.isBlank()) {
                return Collections.emptyList();
            }

            // Nếu dữ liệu không phải JSON, wrap lại
            if (!dbData.trim().startsWith("[") && !dbData.trim().startsWith("{")) {
                dbData = "[\"" + dbData.trim() + "\"]";
            }

            // Đọc danh sách string từ JSON
            List<String> list = objectMapper.readValue(dbData, new TypeReference<List<String>>() {});
            // Chuyển sang enum
            return list.stream()
                    .map(SubscriptionFeatureEnum::valueOf)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new IllegalArgumentException("Error converting JSON to enum list", e);
        }
    }
}
