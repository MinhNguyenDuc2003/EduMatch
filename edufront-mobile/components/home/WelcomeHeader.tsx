import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, View } from "react-native";

const WelcomeHeader = () => {
  return (
    <LinearGradient
      colors={["#75ABFC", "#3d6cb9"]}
      start={{ x: 1, y: 1 }}
      end={{ x: 0, y: 1 }}
      style={{
        // height: verticalScale(145),
        // paddingHorizontal: moderateScale(25),
        // borderBottomLeftRadius: moderateScale(40),
        // borderBottomRightRadius: moderateScale(40),
        // paddingTop: verticalScale(10),
        height: 180,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        paddingTop: 30,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          paddingTop: 30,
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 35,
              color: "#fff",
              fontFamily: "Poppins_600SemiBold",
            }}
          >
            Hi
          </Text>
          <Text
            style={{
              fontSize: 24,
              color: "#fff",
              fontFamily: "Poppins_400Regular",
            }}
          >
            Let's start Learning
          </Text>
        </View>
        {/* <Pressable onPress={() => logout()}>
          <View
            style={{
              width: scale(45),
              height: scale(45),
              borderRadius: scale(10),
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#004FAB",
              borderWidth: 0,
              borderColor: "transparent",
            }}
          >
            <MaterialIcons name="logout" size={scale(25)} color={"#fff"} />
          </View>
        </Pressable> */}
      </View>
    </LinearGradient>
  );
};

export default WelcomeHeader;
