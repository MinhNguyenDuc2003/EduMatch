package com.minh.subscription.data.converter;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.minh.subscription.enums.SubscriptionFeature;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.List;

@Converter(autoApply = true)
public class SubscriptionFeatureConverter implements AttributeConverter<List<SubscriptionFeature>, String> {

    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(List<SubscriptionFeature> features) {
        try {
            return features == null ? "[]" : mapper.writeValueAsString(features);
        } catch (Exception e) {
            throw new IllegalStateException("Error converting features to JSON", e);
        }
    }

    @Override
    public List<SubscriptionFeature> convertToEntityAttribute(String dbData) {
        try {
            return dbData == null ? List.of() :
                    mapper.readValue(dbData, new TypeReference<List<SubscriptionFeature>>() {});
        } catch (Exception e) {
            throw new IllegalStateException("Error reading features JSON", e);
        }
    }
}
