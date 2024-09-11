import { View, Text } from "react-native";
import React from "react";

const GraphSection = () => {
  return (
    <View
      style={{
        width: "100%",
        aspectRatio: 1 / 0.5,
        backgroundColor: "lightblue",
        marginVertical: 10,
      }}
    >
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>There will be Graph here</Text>
      </View>
    </View>
  );
};

export default GraphSection;
