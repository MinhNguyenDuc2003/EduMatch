import {
  CITIZENSHIP_STATUS,
  COUNTRIES,
  GENDER_OPTIONS,
  MAJOR_NAMES,
  STUDY_LEVELS,
} from "@/constants";
import { DEFAULT_APPLICATION_FORM_VALUES } from "@/constants/DefaultValues";
import { applicationSchema, IApplication } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import * as ImagePicker from "expo-image-picker";
import { ImagePlus, Plus, Trash2, X } from "lucide-react-native";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { Alert, Image, ScrollView, TouchableOpacity, View } from "react-native";
import CustomFormField from "../CustomFormField";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { Text } from "../ui/text";

export interface ImageFile {
  uri: string;
  name?: string;
  id?: number;
  type?: string;
}

interface ApplicationFormProps {
  application?: Application;
  onSubmit?: (data: IApplication) => void | Promise<void>;
  onImagesChange?: (images: ImageFile[]) => void;
  onDeleteImage?: (imageId: number) => void;
}

export interface ApplicationFormRef {
  handleSubmit: () => void;
}

const ApplicationForm = forwardRef<ApplicationFormRef, ApplicationFormProps>(
  ({ application, onSubmit, onImagesChange, onDeleteImage }, ref) => {
    const [selectedImages, setSelectedImages] = useState<ImageFile[]>([]);

    const methods = useForm<IApplication>({
      reValidateMode: "onSubmit",
      mode: "onChange",
      resolver: zodResolver(applicationSchema),
      defaultValues: DEFAULT_APPLICATION_FORM_VALUES,
    });

    const { setValue, watch, handleSubmit, getValues } = methods;

    // Expose handleSubmit to parent via ref
    useImperativeHandle(ref, () => ({
      handleSubmit: () => {
        handleSubmit((data) => {
          if (onSubmit) {
            onSubmit(data);
          }
        })();
      },
    }));

    useEffect(() => {
      if (application) {
        methods.reset({
          ...DEFAULT_APPLICATION_FORM_VALUES,
          ...application,
        });

        // Load existing images if available
        if (
          application.applicationMedias &&
          application.applicationMedias.length > 0
        ) {
          const images = application.applicationMedias.map((media) => ({
            uri: media.url,
            name: media.fileName,
            id: media.id,
            type: media.contentType,
          }));
          setSelectedImages(images);
        }
      }
    }, [application, methods]);

    const dateOfBirth = watch("dateOfBirth");
    useEffect(() => {
      if (!dateOfBirth) {
        setValue("age", undefined, { shouldValidate: false });
        return;
      }
      const birthDate = new Date(dateOfBirth);
      if (isNaN(birthDate.getTime())) return;

      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      )
        age--;

      setValue("age", age, { shouldValidate: false });
    }, [dateOfBirth, setValue]);

    // Notify parent when images change
    useEffect(() => {
      if (onImagesChange) {
        onImagesChange(selectedImages);
      }
    }, [selectedImages, onImagesChange]);

    // Request permissions and pick images
    const pickImages = async () => {
      try {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== "granted") {
          Alert.alert(
            "Permission Required",
            "Sorry, we need camera roll permissions to upload images."
          );
          return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ["images"],
          allowsMultipleSelection: true,
          quality: 0.5,
          selectionLimit: 10,
        });

        if (!result.canceled && result.assets) {
          const newImages = result.assets.map((asset, index) => ({
            uri: asset.uri,
            name: `image_${Date.now()}_${index}.jpg`,
            type:
              asset.type === "image"
                ? "image/jpeg"
                : asset.mimeType || "image/jpeg",
          }));

          setSelectedImages((prev) => [...prev, ...newImages]);
        }
      } catch (error) {
        console.error("Error picking images:", error);
        Alert.alert("Error", "Failed to pick images. Please try again.");
      }
    };

    // Remove an image from selection
    const removeImage = (index: number) => {
      const idToRemove = selectedImages[index].id;
      setSelectedImages((prev) => prev.filter((_, i) => i !== index));

      if (idToRemove) {
        onDeleteImage?.(idToRemove);
      }
    };

    const handleAddPreference = () => {
      const currentPreferences = watch("applicationAttributes") || [];
      setValue("applicationAttributes", [
        ...currentPreferences,
        {
          key: "",
          value: "",
          note: "",
        },
      ]);
    };

    const handleRemovePreference = (index: number) => {
      const currentPreferences = watch("applicationAttributes") || [];
      setValue(
        "applicationAttributes",
        currentPreferences.filter((_, i) => i !== index)
      );
    };

    return (
      <Form {...methods}>
        <View className="flex flex-col gap-4">
          <View className="flex flex-col gap-4">
            <Text className="font-semibold text-lg">Personal Information</Text>

            <CustomFormField
              name="fullName"
              label="Full Name*"
              type="text"
              placeholder="Enter your full name"
              inlineLabel
              isBorder={true}
            />

            <CustomFormField
              name="gender"
              label="Gender*"
              type="select"
              placeholder="Select your gender"
              options={GENDER_OPTIONS}
              initialValue={application?.gender}
              inlineLabel
              isBorder={true}
            />

            <CustomFormField
              name="dateOfBirth"
              label="Date of Birth*"
              type="date-of-birth"
              placeholder="Select your date of birth"
              inlineLabel
              isBorder={true}
            />

            <CustomFormField
              name="citizenship"
              label="Citizenship*"
              type="select"
              placeholder="Select your citizenship"
              options={CITIZENSHIP_STATUS}
              initialValue={application?.citizenship}
              inlineLabel
              isBorder={true}
            />

            <CustomFormField
              name="email"
              label="Email*"
              type="email"
              placeholder="Enter your email"
              isBorder={true}
              inlineLabel
            />

            <CustomFormField
              name="phone"
              label="Phone Number*"
              type="text"
              placeholder="Enter your phone number"
              inlineLabel
              isBorder={true}
            />

            <CustomFormField
              name="address"
              label="Address*"
              type="text"
              placeholder="Enter your address"
              inlineLabel
              isBorder={true}
            />

            <CustomFormField
              name="nationality"
              label="Nationality*"
              type="select"
              placeholder="Select your nationality"
              options={COUNTRIES}
              initialValue={application?.nationality}
              inlineLabel
              isBorder={true}
            />
          </View>

          <View className="flex flex-col gap-4">
            <Text className="font-semibold text-lg">
              Educational Background
            </Text>

            <CustomFormField
              name="educationLevel"
              label="Education Level*"
              type="select"
              placeholder="Select your education level"
              options={STUDY_LEVELS}
              initialValue={application?.educationLevel}
              inlineLabel
              isBorder={true}
            />

            <CustomFormField
              name="schoolName"
              label="School Name*"
              type="text"
              placeholder="Enter your school name"
              inlineLabel
              isBorder={true}
            />

            <CustomFormField
              name="major"
              type="select"
              label="Major*"
              placeholder="Select your major"
              options={MAJOR_NAMES}
              initialValue={application?.major}
              inlineLabel
              isBorder={true}
            />

            <CustomFormField
              name="gpa"
              label="GPA*"
              type="number"
              placeholder="Enter your GPA"
              isBorder={true}
              inlineLabel
            />

            <CustomFormField
              name="graduationYear"
              label="Graduation Year*"
              placeholder="Select your graduation year"
              initialValue={application?.graduationYear}
              isBorder={true}
              inlineLabel
            />

            <CustomFormField
              name="classRank"
              label="Class Rank*"
              type="number"
              placeholder="Enter your class rank"
              inlineLabel
              isBorder={true}
            />

            <CustomFormField
              name="classSize"
              label="Class Size*"
              type="number"
              placeholder="Enter your class size"
              isBorder={true}
              inlineLabel
            />

            <CustomFormField
              name="classRankPercentile"
              label="Class Rank Percentile*"
              type="number"
              placeholder="Enter your class rank percentile"
              isBorder={true}
              inlineLabel
            />
          </View>

          <View className="flex flex-col gap-4">
            <Text className="font-semibold text-lg">Test Scores</Text>

            <CustomFormField
              name="satScore"
              label="SAT Score*"
              type="number"
              placeholder="Enter your SAT score"
              inlineLabel
              isBorder={true}
            />
            <CustomFormField
              name="actScore"
              label="ACT Score*"
              type="number"
              placeholder="Enter your ACT score"
              inlineLabel
              isBorder={true}
            />
            <CustomFormField
              name="greScore"
              label="GRE Score*"
              type="number"
              placeholder="Enter your GRE score"
              inlineLabel
              isBorder={true}
            />
            <CustomFormField
              name="gmatScore"
              label="GMAT Score*"
              type="number"
              placeholder="Enter your GMAT score"
              inlineLabel
              isBorder={true}
            />
            <CustomFormField
              name="toeflScore"
              label="TOEFL Score*"
              type="number"
              placeholder="Enter your TOEFL score"
              inlineLabel
              isBorder={true}
            />
            <CustomFormField
              name="ieltsScore"
              label="IELTS Score*"
              placeholder="Enter your IELTS score"
              inlineLabel
              isBorder={true}
            />
          </View>

          <View className="flex flex-col gap-4">
            <Text className="font-semibold text-lg">Skills & Achievements</Text>

            {/* Skills */}
            <CustomFormField
              name="skills"
              label="Skills*"
              placeholder="List your skills (e.g., Programming, Leadership, Communication)"
              inlineLabel
              isBorder={true}
            />

            {/* Achievements */}
            <CustomFormField
              name="achievements"
              label="Achievements*"
              placeholder="Describe your achievements, awards, and recognitions"
              inlineLabel
              isBorder={true}
            />

            {/* Extracurricular Activities */}
            <CustomFormField
              name="extracurricular"
              label="Extracurricular Activities*"
              placeholder="Describe your extracurricular activities, clubs, sports, volunteer work, etc."
              inlineLabel
              isBorder={true}
            />

            {/* Languages */}
            <CustomFormField
              name="languages"
              label="Languages*"
              placeholder="List languages you speak and proficiency levels"
              inlineLabel
              isBorder={true}
            />

            {/* Career Goal */}
            <CustomFormField
              name="careerGoal"
              label="Career Goal*"
              placeholder="Describe your career goals and aspirations"
              inlineLabel
              isBorder={true}
            />

            {/* Research Interest */}
            <CustomFormField
              name="researchInterest"
              label="Research Interest*"
              placeholder="Describe your research interests and areas of focus"
              inlineLabel
              isBorder={true}
            />

            {/* Academic Awards */}
            <CustomFormField
              name="academicAwards"
              label="Academic Awards*"
              placeholder="List your academic awards and recognitions"
              inlineLabel
              isBorder={true}
            />

            {/* Publication Count */}
            <CustomFormField
              name="publicationCount"
              label="Publication Count*"
              type="number"
              placeholder="Enter number of publications"
              inlineLabel
              isBorder={true}
            />

            {/* Work Experience Years */}
            <CustomFormField
              name="workExperienceYears"
              label="Work Experience Years*"
              type="number"
              placeholder="Enter years of work experience"
              inlineLabel
              isBorder={true}
            />

            {/* Athletic Achievements */}
            <CustomFormField
              name="athleticAchievements"
              label="Athletic Achievements*"
              placeholder="Describe your athletic achievements and sports participation"
              inlineLabel
              isBorder={true}
            />
            {/* Is Athlete */}
            <CustomFormField
              name="isAthlete"
              label="Is Athlete*"
              type="switch"
              inlineLabel
              isBorder={true}
            />
          </View>

          <View className="flex flex-col gap-4">
            <Text className="font-semibold text-lg">
              Motivation & Personal Statement
            </Text>
            {/* Motivation */}
            <CustomFormField
              name="motivation"
              label="Motivation*"
              placeholder="Enter your motivation"
              isBorder={true}
            />

            {/* Personal Statement */}
            <CustomFormField
              name="personalStatement"
              label="Personal Statement*"
              placeholder="Enter your personal statement"
              isBorder={true}
            />
          </View>

          <View className="flex flex-col gap-4">
            <View className="flex flex-col gap-2">
              <Text className="font-semibold text-lg">Images</Text>
              <Text className="text-md text-gray-600">
                Upload images related to this application (e.g., university
                photos, event photos)
              </Text>
            </View>

            <View className="flex flex-col gap-4">
              {/* Upload Button */}
              <Button
                variant="outline"
                onPress={pickImages}
                className="flex-row items-center justify-center gap-2 "
              >
                <ImagePlus size={20} className="text-gray-700" />
                <Text className="text-gray-700 font-medium">
                  {selectedImages.length > 0
                    ? "Add More Images"
                    : "Select Images"}
                </Text>
              </Button>

              {/* Image Preview Grid */}
              {selectedImages.length > 0 && (
                <View className="flex flex-col gap-2">
                  <Text className="text-sm text-gray-600">
                    {selectedImages.length} image(s) selected
                  </Text>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="flex flex-row gap-2"
                  >
                    {selectedImages.map((image, index) => (
                      <View
                        key={index}
                        className="relative mr-2 rounded-lg overflow-hidden border border-gray-200"
                      >
                        <Image
                          source={{ uri: image.uri }}
                          className="w-24 h-24 rounded-lg"
                          resizeMode="cover"
                        />
                        <TouchableOpacity
                          onPress={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 rounded-full p-1"
                          activeOpacity={0.7}
                        >
                          <X size={16} color="white" />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>
          </View>

          <View className="flex flex-col gap-4">
            <View className="flex flex-col gap-2">
              <View className="flex flex-row items-center justify-between">
                <Text className="font-semibold text-lg">
                  Additional Information
                </Text>

                <Button
                  className="bg-primary-brand text-white py-1 px-2 h-fit"
                  onPress={handleAddPreference}
                >
                  <Plus className="mr-2" size={16} color="white" />
                  <Text className="text-white font-medium">Add</Text>
                </Button>
              </View>
              <Text className="text-sm text-gray-600">
                Add any additional information or attributes relevant to your
                application
              </Text>
            </View>
            {watch("applicationAttributes")?.map((preference, index) => (
              <View
                key={index}
                className="border-2 border-gray-400 rounded-lg p-2 flex flex-col gap-2"
              >
                <View className="flex flex-row items-center justify-between mb-2">
                  <Text className="font-semibold ">Attribute {index + 1}</Text>
                  <Button
                    variant="ghost"
                    className="py-1 px-2 h-fit bg-none"
                    onPress={() => handleRemovePreference(index)}
                  >
                    <Trash2 className="mr-2" size={16} color="red" />
                  </Button>
                </View>

                <CustomFormField
                  name={`applicationAttributes.${index}.key`}
                  label="Name"
                  type="text"
                  inlineLabel
                  placeholder="Enter name"
                  isBorder={true}
                />

                <CustomFormField
                  name={`applicationAttributes.${index}.value`}
                  label="Value"
                  type="text"
                  inlineLabel
                  placeholder="Enter value"
                  isBorder={true}
                />

                {/* Note */}
                <CustomFormField
                  name={`applicationAttributes.${index}.note`}
                  label="Note"
                  inlineLabel
                  placeholder="Enter note"
                  isBorder={true}
                />
              </View>
            ))}

            {(!watch("applicationAttributes") ||
              watch("applicationAttributes")?.length === 0) && (
              <Text className="text-sm text-gray-500 italic">
                No attributes added yet. Click "Add" to add one.
              </Text>
            )}
          </View>
        </View>
      </Form>
    );
  }
);

export default ApplicationForm;
