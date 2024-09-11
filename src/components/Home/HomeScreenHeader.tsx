import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { info } from "./FriendsSection";
import { formatNumber } from "../../utils/utilFunction";
import CustomPressable from "../../UI/CustomPressable";
import { useNavigation } from "@react-navigation/native";
import { useColors } from "../../contexts/ColorContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebase/FireBaseAuth";
import { get, ref, set } from "firebase/database";

const HomeScreenHeader = () => {
  const { colors } = useColors();
  const navigation = useNavigation<any>();
  const [userName, setUserName] = useState<string | null>(null);
  let { balance } = info;
  let amountColor = balance >= 0 ? "#00bb00" : "red";

  useEffect(() => {
    const fetchData = async () => {
      const user = FIREBASE_AUTH.currentUser;
      if (user) {
        const userRef = ref(FIREBASE_DB, `users/${user.uid}`);
        const onSnapShot = await get(userRef);

        if (onSnapShot.exists()) {
          const userData = onSnapShot.val();
          setUserName(userData.name);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <View>
      <Text style={styles.welcomeText}>Welcome {userName?.split(" ")[0]}</Text>

      <View style={styles.header}>
        <View style={{ gap: 5 }}>
          <Text style={{ color: colors.primary_black, top: 10, fontSize: 26 }}>
            {balance >= 0 ? "You are owed" : "You owe"}
          </Text>
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
          <Ionicons name="notifications" size={31} color="purple" />
        </CustomPressable>
      </View>
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
  welcomeText: {
    color: "skyblue",
    fontWeight: "bold",
    fontSize: 26,
    textAlign: "center",
    marginVertical: 10,
  },
});
