import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { onboarding } from "@/constants";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

const index = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      <View className="w-full flex justify-end items-end p-5">
        <Button
          onPress={() => router.push("/(tabs)/home")}
          className="flex justify-center items-center p-3 bg-primary-brand hover:bg-primary-brand/90"
        >
          <Text className="text-white text-md font-PoppinsBold">Skip</Text>
        </Button>
      </View>

      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full" />
        }
        activeDot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full" />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View className="flex items-center justify-center p-5" key={item.id}>
            <Image
              source={item.image}
              className="w-full h-[400px]"
              resizeMode="contain"
            />
            <View>
              <View className="p-5">
                <Text className="font-PoppinsSemiBold text-[#05030D] text-3xl">
                  {item.title}
                </Text>
                <Text className="font-PoppinsSemiBold text-[#05030D] text-2xl">
                  {item.secondTitle}
                </Text>
                <Text className="text-[#3E3B54] font-PoppinsLight text-md">
                  {item.description}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </Swiper>

      <Button
        onPress={() => {
          isLastSlide
            ? router.push("/(tabs)/home")
            : swiperRef.current?.scrollBy(1);
        }}
        className="w-11/12 mt-5 bg-primary-brand hover:bg-primary-brand/90"
      >
        <Text>{isLastSlide ? "Get started" : "Next"}</Text>
      </Button>
    </SafeAreaView>
  );
};

export default index;
