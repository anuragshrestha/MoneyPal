import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useColors } from "../../contexts/ColorContext";
import { formatNumber } from "../../utils/utilFunction";

export const info = {
  name: "Anurag",
  last_month_return: 15.67,
  lifetime_return: 24.93,
  amount_lent: 2230,
  amount_burrowed: 2000,
  balance: 1345.01,
  friendList: [
    {
      name: "Lax Adhikari",
      amount_lent: 1450,
      interest_earned: 50.12,
      owes: 1500.12,
    },
    {
      name: "Somiyo Rana",
      amount_lent: 200,
      interest_earned: 14.91,
      owes: 214.91,
    },
    {
      name: "Priya Dahal",
      amount_lent: -400,
      interest_earned: -20.01,
      owes: -420.01,
    },
    {
      name: "Bikash",
      amount_lent: -1600,
      interest_earned: -50.12,
      owes: -1670.12,
    },
    {
      name: "Brian Fraze",
      amount_lent: 580,
      interest_earned: 30.12,
      owes: 650.12,
    },
  ],
};

const FriendsSection = () => {
  const { colors } = useColors();
  return (
    <View style={{ marginTop: 25 }}>
      <Text style={{color: colors.primary_black, fontSize: 20, marginBottom: 15 }}>Friends</Text>

      {info.friendList.map((item, index) => {
        let positiveInterest = item.interest_earned >= 0;
        let statusColor = positiveInterest ? "#00bb00" : "red";
        let isLastItem = index === info.friendList.length - 1;
        return (
          <View
            key={index}
            style={[styles.conatiner, {borderBottomWidth: isLastItem ? 0 : 1}]}
          >
            <View style={{ width: "37.5%" }}>
              <Text style={{color: colors.primary_black,  letterSpacing: 1, fontSize: 18 }}>{item.name}</Text>
              <Text style={{color: statusColor}} >${formatNumber(Math.abs(item.amount_lent), 2)}</Text>
            </View>

            <View
              style={[styles.price, {backgroundColor: statusColor}]}
            >
              <Text style={{ color: "white" }}>
                {positiveInterest ? "+" : "-"}$
                {positiveInterest
                  ? item.interest_earned
                  : -1 * item.interest_earned}
              </Text>
            </View>

            <View
              style={{
                width: "37.5%",
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 12 }}>
                {item.owes > 0
                  ? "owes you"
                  : item.owes == 0
                  ? "settled"
                  : "you owe"}
              </Text>
              <Text style={{ color: statusColor, fontWeight: "bold" , fontSize: 16}}>
                ${formatNumber(Math.abs(item.owes), 2)}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default FriendsSection;

const styles = StyleSheet.create({
  conatiner:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: "grey",
    paddingVertical: 15,
  },
  price: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  }
});
