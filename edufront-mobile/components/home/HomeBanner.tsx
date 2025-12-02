import { bannerData } from "@/constants";
import React from "react";
import { Image, Pressable, View } from "react-native";
import Swiper from "react-native-swiper";

const HomeBanner = () => {
  return (
    <View className="h-48 rounded-md overflow-hidden">
      <Swiper
        dotStyle={{
          backgroundColor: "#e5ecf9",
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 5,
        }}
        activeDotStyle={{
          backgroundColor: "#3d6cb9",
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 5,
        }}
        autoplay={true}
        autoplayTimeout={10}
      >
        {bannerData.map((item, index: number) => (
          <Pressable key={index}>
            <Image
              source={item.image}
              alt={`banner${index}`}
              className="w-full h-[200px] object-cover rounded-md"
            />
          </Pressable>
        ))}
      </Swiper>
    </View>
  );
};

export default HomeBanner;
