package com.minh.subscription.data.converter;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.minh.enumeration.subscription.SubscriptionFeatureEnum;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.List;

@Converter(autoApply = true)
public class SubscriptionFeatureConverter implements AttributeConverter<List<SubscriptionFeatureEnum>, String> {

    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(List<SubscriptionFeatureEnum> features) {
        try {
            return features == null ? "[]" : mapper.writeValueAsString(features);
        } catch (Exception e) {
            throw new IllegalStateException("Error converting features to JSON", e);
        }
    }

    @Override
    public List<SubscriptionFeatureEnum> convertToEntityAttribute(String dbData) {
        try {
            return dbData == null ? List.of() :
                    mapper.readValue(dbData, new TypeReference<List<SubscriptionFeatureEnum>>() {});
        } catch (Exception e) {
            throw new IllegalStateException("Error reading features JSON", e);
        }
    }
}
