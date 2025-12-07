import Payment from "@/components/Payment";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/hooks/useAuth";
import {
  useConfirmPaymentMutation,
  useExtendSubscriptionMutation,
  useGetSubscriptionByTargetTypeQuery,
} from "@/state/api";
import { StripeProvider } from "@stripe/stripe-react-native";
import { Check, Gem } from "lucide-react-native";
import React, { useMemo } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const subscriptionFeatures = {
  POST_SCHOLARSHIP: "Post scholarships",
  AI_PROFILE_RECOMMENDATION: "AI applicant recommendation",
  APPLICATION_FILTERING: "Application filtering",
  AI_SCHOLARSHIP_NOTIFICATION:
    "Receive notifications for suitable scholarships",
  AI_SCHOLARSHIP_RECOMMENDATION:
    "Receive scholarship recommendations based on your profile",
};

const index = () => {
  const { data: subscriptionData, isLoading } =
    useGetSubscriptionByTargetTypeQuery({
      targetType: "APPLICANT",
    });

  const {
    user,
    isLoading: authLoading,
    subscriptions: userSubscriptions,
  } = useAuth();

  const userSubscription = useMemo(() => {
    return userSubscriptions.find(
      (userSubscription) =>
        userSubscription.userType === subscriptionData?.[0].targetType
    );
  }, [subscriptionData]);

  const [confirmPayment, { isLoading: isConfirmPaymentLoading }] =
    useConfirmPaymentMutation();
  const [extendSubscription] = useExtendSubscriptionMutation();

  if (isLoading || authLoading)
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );

  if (!subscriptionData || subscriptionData?.length === 0)
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg font-bold">No subscription found</Text>
      </View>
    );

  const handleSuccess = async (paymentIntentId: string) => {
    try {
      if (userSubscription) {
        await extendSubscription({
          subscriptionId: userSubscription.id,
          subscriptionPlanId: subscriptionData[0].id,
          transactionId: paymentIntentId,
        });
      } else {
        await confirmPayment({
          transactionId: paymentIntentId,
          subscriptionPlanId: subscriptionData[0].id,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StripeProvider
      publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLIC_KEY!}
      urlScheme="edufrontmobile"
    >
      <View className="flex-1 p-4 flex flex-col gap-4">
        <View>
          <Text className="text-lg font-bold">Update your account</Text>
          <Text className="text-sm text-gray-500">
            Unlock all features with a premium plan
          </Text>
        </View>

        <View className="flex-1 bg-blue-50 rounded-2xl flex gap-2 p-4 c border border-primary-brand">
          <View className="flex flex-col gap-2 items-center justify-center">
            <Gem size={62} color="#3d6cb9" />
            <Text className="text-lg font-bold">
              {subscriptionData[0].name}
            </Text>
            <Text className="text-sm text-gray-500 text-center">
              {subscriptionData[0].description}
            </Text>
            <View className="flex flex-row items-end">
              <Text className="text-3xl text-primary-brand font-bold">
                {subscriptionData[0].price.toFixed(2)}{" "}
                {subscriptionData[0].currency}
              </Text>
              <Text className="text-sm text-gray-500">/ month</Text>
            </View>
          </View>
          <View className="flex flex-col gap-2">
            <Text className="text-sm font-normal text-gray-500">
              {subscriptionData[0].name} features:
            </Text>
            <View className="flex flex-col gap-2">
              {subscriptionData[0].features.map((feature, index) => (
                <View className="flex flex-row items-center gap-2" key={index}>
                  <Check size={12} color="#3d6cb9" />
                  <Text className="text-sm font-normal text-gray-500">
                    {
                      subscriptionFeatures[
                        feature as keyof typeof subscriptionFeatures
                      ]
                    }
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <Payment
          amount={subscriptionData[0].price}
          email={user?.email!}
          handleSuccess={handleSuccess}
        />
      </View>
    </StripeProvider>
  );
};

export default index;

const styles = StyleSheet.create({});
