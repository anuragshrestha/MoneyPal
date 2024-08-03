import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useColors } from "../../contexts/ColorContext";
import { info } from "./FriendsSection";
import { formatNumber } from "../../utils/utilFunction";

const ReturnInfo = () => {
  const { colors } = useColors();
  let { lifetime_return, amount_lent, amount_burrowed } = info;
  let lifetime_return_color = lifetime_return > 0 ? "#00b300" : "red";
  return (
    <View>
      <Text style={{color: colors.primary_black, fontSize: 20, marginBottom: 10, paddingTop: 15 }}>Earnings Overview</Text>
      <View
        style={[
          styles.test,
          {
            borderBottomColor: colors.primary_lightgrey,
          },
        ]}
      >
        <Text style={{color: colors.primary_black, fontSize: 15 }}>Lifetime Return</Text>
        <Text style={{color: colors.primary_black}}>{`${lifetime_return > 0 ? "+" : "-"}$${Math.abs(
          lifetime_return
        )}`}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottomColor: colors.primary_lightgrey,
          borderBottomWidth: 1,
          paddingVertical: 15,
        }}
      >
        <Text style={{color: colors.primary_black, fontSize: 15 }}>Lent amount</Text>
        <Text style={{color: colors.primary_black}}>${formatNumber(amount_lent, 2)}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottomColor: colors.primary_lightgrey,
          borderBottomWidth: 1,
          paddingVertical: 15,
        }}
      >
        <Text style={{color: colors.primary_black, fontSize: 15 }}>Burrowed amount</Text>
        <Text style={{color: colors.primary_black}}>${formatNumber(amount_burrowed, 2)}</Text>
      </View>
    </View>
  );
};

export default ReturnInfo;

const styles = StyleSheet.create({
  test: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    paddingVertical: 15,
  },
});
