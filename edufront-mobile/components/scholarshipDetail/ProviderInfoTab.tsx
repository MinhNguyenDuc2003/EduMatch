import React from "react";
import { ScrollView, Text, View } from "react-native";

interface ProviderInfoTabProps {
  provider: any;
}

export const ProviderInfoTab: React.FC<ProviderInfoTabProps> = ({
  provider,
}) => {
  return (
    <ScrollView className="px-4 pt-4">
      <View
        style={{
          backgroundColor: "#f9fafb",
          padding: 16,
          borderRadius: 16,
          marginBottom: 16,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 12 }}>
          {provider.organizationName}
        </Text>

        <View style={{ marginBottom: 12 }}>
          <Text
            style={{ fontWeight: "600", color: "#3d6cb9", marginBottom: 4 }}
          >
            Organization Type
          </Text>
          <Text style={{ color: "#374151" }}>{provider.organizationType}</Text>
        </View>

        {provider.description && (
          <View style={{ marginBottom: 12 }}>
            <Text
              style={{ fontWeight: "600", color: "#3d6cb9", marginBottom: 4 }}
            >
              Description
            </Text>
            <Text style={{ color: "#374151", lineHeight: 22 }}>
              {provider.description}
            </Text>
          </View>
        )}

        {provider.website && (
          <View style={{ marginBottom: 12 }}>
            <Text
              style={{ fontWeight: "600", color: "#3d6cb9", marginBottom: 4 }}
            >
              Website
            </Text>
            <Text style={{ color: "#2563eb" }}>{provider.website}</Text>
          </View>
        )}

        {provider.establishedYear && (
          <View style={{ marginBottom: 12 }}>
            <Text
              style={{ fontWeight: "600", color: "#3d6cb9", marginBottom: 4 }}
            >
              Established Year
            </Text>
            <Text style={{ color: "#374151" }}>{provider.establishedYear}</Text>
          </View>
        )}

        {provider.countryCode && (
          <View style={{ marginBottom: 12 }}>
            <Text
              style={{ fontWeight: "600", color: "#3d6cb9", marginBottom: 4 }}
            >
              Country
            </Text>
            <Text style={{ color: "#374151" }}>{provider.countryCode}</Text>
          </View>
        )}

        {provider.address && (
          <View style={{ marginBottom: 12 }}>
            <Text
              style={{ fontWeight: "600", color: "#3d6cb9", marginBottom: 4 }}
            >
              Address
            </Text>
            <Text style={{ color: "#374151" }}>{provider.address}</Text>
          </View>
        )}
      </View>

      {/* Contact Information */}
      {provider.providerContactDtos &&
        provider.providerContactDtos.length > 0 && (
          <View
            style={{
              backgroundColor: "#f9fafb",
              padding: 16,
              borderRadius: 16,
              marginBottom: 16,
            }}
          >
            <Text
              style={{ fontSize: 18, fontWeight: "bold", marginBottom: 12 }}
            >
              Contact Information
            </Text>

            {provider.providerContactDtos.map((contact: any) => (
              <View
                key={contact.id}
                style={{
                  backgroundColor: "white",
                  padding: 12,
                  borderRadius: 12,
                  marginBottom: 12,
                  borderWidth: 1,
                  borderColor: "#e5e7eb",
                }}
              >
                <Text
                  style={{ fontWeight: "600", fontSize: 16, marginBottom: 4 }}
                >
                  {contact.contactName}
                </Text>
                <Text style={{ color: "#6b7280", marginBottom: 8 }}>
                  {contact.roleTitle}
                </Text>
                {contact.email && (
                  <View style={{ flexDirection: "row", marginBottom: 4 }}>
                    <Text
                      style={{ fontWeight: "600", color: "#3d6cb9", width: 60 }}
                    >
                      Email:
                    </Text>
                    <Text style={{ color: "#374151", flex: 1 }}>
                      {contact.email}
                    </Text>
                  </View>
                )}
                {contact.phone && (
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{ fontWeight: "600", color: "#3d6cb9", width: 60 }}
                    >
                      Phone:
                    </Text>
                    <Text style={{ color: "#374151", flex: 1 }}>
                      {contact.phone}
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

      {/* Social Media Links */}
      {(provider.facebookUrl ||
        provider.twitterUrl ||
        provider.linkedinUrl) && (
        <View
          style={{
            backgroundColor: "#f9fafb",
            padding: 16,
            borderRadius: 16,
            marginBottom: 16,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 12 }}>
            Social Media
          </Text>

          {provider.facebookUrl && (
            <View style={{ marginBottom: 8 }}>
              <Text style={{ fontWeight: "600", color: "#3d6cb9" }}>
                Facebook
              </Text>
              <Text style={{ color: "#2563eb" }}>{provider.facebookUrl}</Text>
            </View>
          )}

          {provider.twitterUrl && (
            <View style={{ marginBottom: 8 }}>
              <Text style={{ fontWeight: "600", color: "#3d6cb9" }}>
                Twitter
              </Text>
              <Text style={{ color: "#2563eb" }}>{provider.twitterUrl}</Text>
            </View>
          )}

          {provider.linkedinUrl && (
            <View style={{ marginBottom: 8 }}>
              <Text style={{ fontWeight: "600", color: "#3d6cb9" }}>
                LinkedIn
              </Text>
              <Text style={{ color: "#2563eb" }}>{provider.linkedinUrl}</Text>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};
