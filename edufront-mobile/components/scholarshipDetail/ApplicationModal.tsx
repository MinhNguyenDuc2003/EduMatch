import React from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";

interface ApplicationModalProps {
  visible: boolean;
  applications: any[];
  selectedApplicationId: number | null;
  onSelectApplication: (id: number) => void;
  onClose: () => void;
  onSubmit: () => void;
  onCreateNew: () => void;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({
  visible,
  applications,
  selectedApplicationId,
  onSelectApplication,
  onClose,
  onSubmit,
  onCreateNew,
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.4)",
          justifyContent: "flex-end",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            maxHeight: "70%",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
            My Applications
          </Text>

          <ScrollView style={{ maxHeight: "50%" }}>
            {applications?.map((item: Application) => {
              const isSelected = selectedApplicationId === item.id;

              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => onSelectApplication(item.id)}
                  style={{
                    backgroundColor: isSelected ? "#eff6ff" : "#f3f4f6",
                    padding: 12,
                    borderRadius: 12,
                    marginBottom: 10,
                    borderWidth: isSelected ? 2 : 0,
                    borderColor: isSelected ? "#3b82f6" : "transparent",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: isSelected ? "#3b82f6" : "black",
                    }}
                  >
                    {item.applicationName}
                  </Text>
                  <Text
                    style={{
                      color: isSelected ? "#3b82f6" : "#6b7280",
                    }}
                  >
                    Major: {item.major}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <View style={{ flexDirection: "row", marginTop: 15 }}>
            <TouchableOpacity
              onPress={onClose}
              style={{
                flex: 1,
                padding: 12,
                backgroundColor: "#9ca3af",
                borderRadius: 12,
                marginRight: 10,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Close</Text>
            </TouchableOpacity>

            <TouchableOpacity
              disabled={!selectedApplicationId}
              onPress={onSubmit}
              style={{
                flex: 1,
                padding: 12,
                backgroundColor: selectedApplicationId ? "#3b82f6" : "#d1d5db",
                borderRadius: 12,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Submit</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={onCreateNew}
            style={{
              marginTop: 12,
              padding: 12,
              backgroundColor: "#2563eb",
              borderRadius: 12,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Create New
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
