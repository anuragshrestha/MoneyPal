import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import { useColors } from "../contexts/ColorContext";
import { formatNumber } from "../utils/utilFunction";
import { GlobalStyles } from "../constants/globalstyles";
import { useNavigation } from "@react-navigation/native";
import { StackType } from "../naviagtionTypes";
import { StackNavigationProp } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";

export const info = {
  friendList: [
    {
      name: "James",
      amount_lent: 1450,
      interest_earned: 50.12,
      owes: 1500.12,
      day: "Sunday",
      time: "10:35 pm",
    },
    {
      name: "David",
      amount_lent: 200,
      interest_earned: 14.91,
      owes: 214.91,
      day: "Monday",
      time: "8:30 pm",
    },
    {
      name: "Robert",
      amount_lent: -400,
      interest_earned: -20.01,
      owes: -420.01,
      day: "Sunday",
      time: "6:10 Am",
    },
  ],
};

type StackTypeNavigaton = StackNavigationProp<StackType, "Home">;

function NotificationScreen() {
  const { colors } = useColors();
  const navigation = useNavigation<StackTypeNavigaton>();

  const interestTransactions = info.friendList.filter(
    (item) => item.interest_earned !== 0
  );
  const amount_lentTransactions = info.friendList.filter(
    (item) => item.amount_lent !== 0
  );

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Icon name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.primary_black }]}>
          Recent Activity
        </Text>

        {interestTransactions.map((item, index) => {
          let amount = item.amount_lent > 0;
          let positiveInterest = item.interest_earned >= 0;
          let statusColor = positiveInterest ? "#00bb00" : "red";
          return (
            <View key={index} style={styles.outerInterest}>
              <View style={styles.innerInterest}>
                <Text style={{ color: colors.primary_black, fontSize: 16 }}>
                  An automatic interest of{" "}
                  <Text style={{ color: statusColor }}>
                    ${formatNumber(Math.abs(item.interest_earned), 2)}
                  </Text>{" "}
                  was charged for {item.name}.
                </Text>
                <Text
                  style={{
                    color: colors.primary_darkergrey,
                    paddingVertical: 5,
                  }}
                >
                  {item.day} at {item.time}
                </Text>
              </View>
            </View>
          );
        })}

        {/* Displaying the amount lent or borrowed transactions only */}
        {amount_lentTransactions.map((item, index) => {
          let amount = item.amount_lent >= 0;
          let borrowed = amount ? "lent by" : "borrowed from";
          let positiveInterest = item.interest_earned >= 0;
          let statusColor = positiveInterest ? "#00bb00" : "red";
          let owesText = amount
            ? `${item.name} owes you`
            : `You owe ${item.name}`;

          return (
            <View key={index} style={styles.outerInterest}>
              <View style={styles.innerInterest}>
                <Text style={{ color: colors.primary_black, fontSize: 16 }}>
                  A amount of{" "}
                  <Text style={{ color: statusColor }}>
                    ${amount ? item.amount_lent : -1 * item.amount_lent}
                  </Text>{" "}
                  was {borrowed} {item.name}.{" "}
                </Text>
                <Text
                  style={{
                    color: colors.primary_darkergrey,
                    paddingVertical: 5,
                  }}
                >
                  {" "}
                  {owesText} a total of{" "}
                  <Text style={{ color: statusColor }}>
                    ${formatNumber(Math.abs(item.owes), 2)}
                  </Text>
                  .
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 10,
  },
  title: {
    marginBottom: 15,
    marginTop: 20,
    fontSize: 22,
    marginLeft: 40,
  },
  backButton: {
    position: "absolute",
    top: 28,
    left: 10,
  },
  outerInterest: {
    borderBottomColor: GlobalStyles.colors.primary_black,
    paddingVertical: 5,
    borderBottomWidth: 1,
    marginHorizontal: 10,
  },
  innerInterest: {
    flexDirection: "column",
    margin: 5,
  },
});

export default NotificationScreen;
