import { useStripe } from "@stripe/stripe-react-native";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text } from "react-native";
import { Toast } from "toastify-react-native";
import { useCreatePaymentIntentMutation } from "../state/api";
import { Button } from "./ui/button";

const Payment = ({
  amount,
  email,
  handleSuccess,
}: {
  amount: number;
  email: string;
  handleSuccess: (clientSecret: string) => void;
}) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [paymentIntentId, setPaymentIntentId] = useState<string | "">("");

  const [createPaymentIntent] = useCreatePaymentIntentMutation();

  const initializePaymentSheet = async () => {
    const paymentIntent = await createPaymentIntent({
      amount: amount,
      email: email,
    }).unwrap();

    setPaymentIntentId(paymentIntent.id);

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      paymentIntentClientSecret: paymentIntent.client_secret,
    });
  };

  const openPaymentSheet = async () => {
    await initializePaymentSheet();

    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      try {
        handleSuccess(paymentIntentId);
        Toast.success("Payment successful");
        router.push("/(tabs)/profile");
      } catch (error) {
        console.log(error);
      } finally {
        setPaymentIntentId("");
      }
    }
  };

  return (
    <Button
      onPress={openPaymentSheet}
      // disabled={!loading}
      size={"sm"}
      className="bg-primary-brand p-0 rounded-xl"
    >
      <Text className="text-white">Pay with Credit Card</Text>
    </Button>
  );
};

export default Payment;
