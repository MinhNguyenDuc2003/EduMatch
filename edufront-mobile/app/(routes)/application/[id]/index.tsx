import ApplicationForm from "@/components/application/ApplicationForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { IApplication } from "@/lib/schemas";
import {
  useDeleteImagesMutation,
  useGetApplicationByIdQuery,
  useUpdateApplicationMutation,
  useUploadImagesMutation,
} from "@/state/api";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, View } from "react-native";
import "react-native-get-random-values";

interface ImageFile {
  uri: string;
  name?: string;
  id?: number;
  type?: string;
}

const index = () => {
  const { id } = useLocalSearchParams();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);
  const [applicationName, setApplicationName] = useState("");

  const { data: application, isLoading: isLoadingApplication } =
    useGetApplicationByIdQuery(id as string, {
      skip: !id,
    });
  const [updateApplication, { isLoading: isLoadingUpdateApplication }] =
    useUpdateApplicationMutation();
  const [uploadImages] = useUploadImagesMutation();
  const [deleteImage] = useDeleteImagesMutation();

  const formRef = useRef<{ handleSubmit: () => void }>(null);

  const onSubmit = async (data: IApplication) => {
    try {
      setIsSubmitting(true);

      await updateApplication(data)
        .unwrap()
        .then(() => {
          router.back();
          setShowNameModal(false);
          setApplicationName("");
        });
    } catch (error: any) {
      console.error("ERROR:", error.response?.data || error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImagesChange = async (images: ImageFile[]) => {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("mediaFiles", {
        uri: image.uri,
        name: image.name || `image_${Date.now()}`,
        type: image.type || "image/jpeg",
      } as any);
    });
    await uploadImages({ applicationId: id as string, formData }).unwrap();
  };

  const handleDeleteImage = async (imageId: number) => {
    await deleteImage({
      applicationId: id as string,
      imagesId: [imageId],
    }).unwrap();
  };

  const handleFormSubmit = () => {
    setShowNameModal(true);
  };

  const handleConfirmSubmit = () => {
    if (!applicationName.trim()) {
      Alert.alert("Error", "Please enter an application name");
      return;
    }
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  useEffect(() => {
    if (application) {
      setApplicationName(application.applicationName);
    }
  }, [application]);

  if (isLoadingApplication)
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" className="text-primary-brand mt-5" />
      </View>
    );

  return (
    <View className="flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 p-4"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <ApplicationForm
          ref={formRef}
          application={application}
          onSubmit={onSubmit}
          onImagesChange={handleImagesChange}
          onDeleteImage={handleDeleteImage}
        />
      </ScrollView>

      {/* Submit Button - Fixed at bottom */}
      <View className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <Button
          onPress={handleFormSubmit}
          disabled={isSubmitting}
          className="w-full bg-primary-brand"
        >
          <Text className="text-white font-semibold">
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Text>
        </Button>
      </View>

      {/* Application Name Modal */}
      <Dialog open={showNameModal} onOpenChange={setShowNameModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Name Your Application</DialogTitle>
            <DialogDescription>
              Please provide a name for your application before submitting.
            </DialogDescription>
          </DialogHeader>

          <View className="flex flex-col gap-2">
            <Input
              placeholder="e.g., Harvard Application 2025"
              value={applicationName}
              onChangeText={setApplicationName}
              editable={!isSubmitting}
            />
          </View>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={isSubmitting}>
                <Text>Cancel</Text>
              </Button>
            </DialogClose>
            <Button
              onPress={handleConfirmSubmit}
              disabled={isSubmitting}
              className="bg-primary-brand"
            >
              <Text className="text-white">
                {isSubmitting ? "Submitting..." : "Submit"}
              </Text>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </View>
  );
};

export default index;
