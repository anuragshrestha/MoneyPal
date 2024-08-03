import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { ColorContextProvider, useColors } from "./src/contexts/ColorContext";
import AppNavigator from "./src/screens/AppNavigator";

export default function App() {
  const {theme} = useColors()
  return (
    <View style={styles.container}>
      <ColorContextProvider>
      <AppNavigator/>
      </ColorContextProvider>
      <StatusBar style={theme !== "dark" ? "light" : "dark"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
