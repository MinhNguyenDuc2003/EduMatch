import { DEFAULT_PROFILE_FORM_VALUES } from "@/constants";
import { IProfileForm, profileSchema } from "@/lib/schemas";
import { ProfileApiResponse } from "@/types/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent } from "../ui/dialog";
import { Form } from "../ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Text } from "../ui/text";
import PhoneNumbers from "./PhoneNumbers";
import Skills from "./Skills";
import StudentInformation from "./StudentInformation";

interface EditFormDialogProps {
  profile: ProfileApiResponse;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: IProfileForm) => void;
  onCancel: () => void;
  value: string;
  setValue: (value: string) => void;
}

const EditFormDialog = ({
  profile,
  open,
  onOpenChange,
  onSubmit,
  onCancel,
  value,
  setValue,
}: EditFormDialogProps) => {
  const methods = useForm<IProfileForm>({
    reValidateMode: "onSubmit",
    defaultValues: DEFAULT_PROFILE_FORM_VALUES,
    mode: "onChange",
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (profile && profile?.applicantProfile && profile?.addresses) {
      methods.reset({
        addressPostVm: profile?.addresses[0],
        applicantProfile: profile?.applicantProfile,
      });
    }
  }, [profile]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[300px] bg-[#FAFAF6]">
        <Form {...methods}>
          <Tabs value={value} onValueChange={setValue}>
            <TabsList scrollable>
              <TabsTrigger value="personal">
                <Text>Personal</Text>
              </TabsTrigger>
              <TabsTrigger value="activities">
                <Text>Activities</Text>
              </TabsTrigger>
              <TabsTrigger value="phone">
                <Text>Phone</Text>
              </TabsTrigger>
              <TabsTrigger value="education">
                <Text>Education</Text>
              </TabsTrigger>
              <TabsTrigger value="skills">
                <Text>Skills</Text>
              </TabsTrigger>
              <TabsTrigger value="certificates">
                <Text>Certificates</Text>
              </TabsTrigger>
              <TabsTrigger value="intentions">
                <Text>Intentions</Text>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <StudentInformation />
            </TabsContent>
            <TabsContent value="activities">
              <Text>Activities content</Text>
            </TabsContent>
            <TabsContent value="phone">
              <PhoneNumbers />
            </TabsContent>
            <TabsContent value="education">
              <Text>Education content</Text>
            </TabsContent>
            <TabsContent value="skills">
              <Skills />
            </TabsContent>
            <TabsContent value="certificates">
              <Text>Certificates content</Text>
            </TabsContent>
            <TabsContent value="intentions">
              <Text>Intentions content</Text>
            </TabsContent>
          </Tabs>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditFormDialog;
