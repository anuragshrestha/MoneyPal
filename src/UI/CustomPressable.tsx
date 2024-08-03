import {
    Pressable,
    PressableProps,
    StyleProp,
    StyleSheet,
    ViewStyle,
  } from "react-native";
  import React, { FC } from "react";
  
  interface CustomPressableProps extends PressableProps {
    style?: StyleProp<ViewStyle>;
  }
  
  const CustomPressable: FC<CustomPressableProps> = (props) => {
    const { style, onPress, children, onLongPress } = props;
    return (
      <Pressable
        style={({ pressed }) => (pressed ? [styles.pressed, style] : style)}
        onPress={onPress}
        onLongPress={onLongPress}
      >
        {children}
      </Pressable>
    );
  };
  
  export default CustomPressable;
  
  const styles = StyleSheet.create({
    pressed: {
      opacity: 0.75,
    },
  });
  