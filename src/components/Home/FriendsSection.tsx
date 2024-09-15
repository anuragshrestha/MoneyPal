import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useColors } from "../../contexts/ColorContext";
import { formatNumber } from "../../utils/utilFunction";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { FIREBASE_DB1, FIREBASE_AUTH } from "../../firebase/FireBaseAuth";

export const info = {
  //name: "Anurag",
  last_month_return: 15.67,
  lifetime_return: 24.93,
  amount_lent: 2230,
  amount_burrowed: 2000,
  balance: 1345.01,
  friendList: [
    {
      name: "James Bond",
      amount_lent: 1450,
      interest_earned: 50.12,
      owes: 1500.12,
    },
    {
      name: "Alex Rodriguez",
      amount_lent: -400,
      interest_earned: -14.91,
      owes: -414.91,
    },
  ],
};

interface Transaction {
  length: number;
  name: string;
  email: string;
  amount: string;
  transactionType: string;
  interestEarned: string;
}

const FriendsSection = () => {
  const { colors } = useColors();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const unsubscribe = fetchAllTransactions();
    return () => unsubscribe && unsubscribe();
  }, []);

  const fetchAllTransactions = useCallback(() => {
    const user = FIREBASE_AUTH.currentUser;

    if (user) {
      const userDocRef = doc(FIREBASE_DB1, "transactions", user.uid);
      const unsubscribe = onSnapshot(
        collection(userDocRef, "userTransactions"),
        (snapshot) => {
          const transactionArray: Transaction[] = [];

          snapshot.forEach((doc) => {
            const data = doc.data() as Transaction;
            transactionArray.push(data);
          });
          setTransactions(transactionArray);
        },
        (error) => {
          console.log("Error fetchong real-time data: ", error);
        }
      );

      return unsubscribe;
    } else {
      console.log("no user logged in");
    }
  }, []);

  return (
    <View style={{ marginTop: 25 }}>
      <Text
        style={{ color: colors.primary_black, fontSize: 20, marginBottom: 15 }}
      >
        Friends
      </Text>

      {info.friendList.map((item, index) => {
        let positiveInterest = item.interest_earned >= 0;
        let statusColor = positiveInterest ? "#00bb00" : "red";
        return (
          <View
            key={index}
            style={[styles.conatiner, { borderBottomWidth: 1 }]}
          >
            <View style={{ width: "37.5%" }}>
              <Text
                style={{
                  color: colors.primary_black,
                  letterSpacing: 1,
                  fontSize: 18,
                }}
              >
                {item.name}
              </Text>
              <Text style={{ color: statusColor }}>
                ${formatNumber(Math.abs(item.amount_lent), 2)}
              </Text>
            </View>

            <View style={[styles.price, { backgroundColor: statusColor }]}>
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
              <Text
                style={{ color: statusColor, fontWeight: "bold", fontSize: 16 }}
              >
                ${formatNumber(Math.abs(item.owes), 2)}
              </Text>
            </View>
          </View>
        );
      })}

      {transactions.map((transaction, index) => {
        let positiveInterest = transaction.transactionType === "Lent";
        let statusColor = positiveInterest ? "#00bb00" : "red";
        let isLastItem = index === transactions.length - 1;
        let transactionAmount = parseFloat(transaction.amount);
        let interest_earned = parseFloat(transaction.interestEarned);
        let totalAmount = transactionAmount + interest_earned;

        if (totalAmount > 0) {
          return (
            <View
              key={index}
              style={[
                styles.conatiner,
                { borderBottomWidth: isLastItem ? 0 : 1 },
              ]}
            >
              <View style={{ width: "37.5%" }}>
                <Text
                  style={{
                    color: colors.primary_black,
                    letterSpacing: 1,
                    fontSize: 18,
                  }}
                >
                  {transaction.name}
                </Text>
                <Text style={{ color: statusColor }}>
                  ${formatNumber(Math.abs(transactionAmount), 2)}
                </Text>
              </View>

              <View style={[styles.price, { backgroundColor: statusColor }]}>
                <Text style={{ color: "white" }}>
                  {positiveInterest ? "+" : "-"}$
                  {formatNumber(Math.abs(interest_earned), 2)}
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
                  {positiveInterest
                    ? "owes you"
                    : !positiveInterest
                    ? "you owe"
                    : "settled"}
                </Text>
                <Text
                  style={{
                    color: statusColor,
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                >
                  ${formatNumber(Math.abs(totalAmount), 2)}
                </Text>
              </View>
            </View>
          );
        }
      })}
    </View>
  );
};

export default FriendsSection;

const styles = StyleSheet.create({
  conatiner: {
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
  },
});
