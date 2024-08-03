import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { info } from "./FriendsSection";
import { formatNumber } from "../../utils/utilFunction";
import CustomPressable from "../../UI/CustomPressable";
import { useNavigation } from "@react-navigation/native";
import { useColors } from "../../contexts/ColorContext";
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeScreenHeader = () => {
  const {colors} = useColors()
  const navigation = useNavigation<any>()
  let { balance } = info;
  let amountColor = balance >= 0 ? "#00bb00" : "red";
  return (
    <View style={styles.header}>
      <View style={{ gap: 5 }}>
        <Text style={{color: colors.primary_black, top: 10, fontSize: 26}}>{balance >= 0 ? "You are owed" : "You owe"}</Text>
        <Text
          style={[
            styles.amount,
            {
              color: amountColor,
            },
          ]}
        >
          {`$${formatNumber(Math.abs(balance), 2)}`}
        </Text>
      </View>

      <CustomPressable onPress={() => navigation.navigate("Notification")}>
      <Ionicons name="notifications" size={31} color= "purple" />
      </CustomPressable>
    </View>
  );
};

export default HomeScreenHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  amount: {
    fontWeight: "bold",
    color: "green",
    fontSize: 25,
    paddingTop: 10,
  },
});
