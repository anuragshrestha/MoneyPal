import React from "react";
import { ReactNode } from "react";
import { Platform, View } from "react-native";
import { SafeAreaView } from "react-native";
import { useColors } from "../contexts/ColorContext";

interface ScreenWrapperPropsType {
  children: ReactNode;
  bg?: string | null;
  style?: any;
}

const ScreenWrapper = (props: ScreenWrapperPropsType) => {
  const {colors} = useColors()
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.primary_white,
      }}
    >
      <View
        style={{
          paddingTop: Platform.OS === "ios" ? 5 : 30,
          paddingHorizontal: 10,
          flex: 1,
          ...props.style,
        }}
      >
        {props.children}
        {/* -- foreground notification -- implementation to be done */}
      </View>
    </SafeAreaView>
  );
};

export default ScreenWrapper;
