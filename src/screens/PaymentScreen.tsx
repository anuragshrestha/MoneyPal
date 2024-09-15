import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  StatusBar,
  FlatList,
  TextInput,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { FIREBASE_AUTH, FIREBASE_DB1 } from "../firebase/FireBaseAuth";
import { useColors } from "../contexts/ColorContext";
import Icon from "react-native-vector-icons/MaterialIcons";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { set } from "firebase/database";
import { AccountStackParamList } from "../navigation/AccountStack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";


interface Transaction {
  name: string;
  email: string;
  amount: string;
  transactionType: string;
  interest: string;
  interestEarned: string;
}

const PaymentScreen = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const { colors } = useColors();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<AccountStackParamList>>();


  useEffect(() => {
    const unsubscribe = fetchAllTransactions();
    return () => unsubscribe && unsubscribe();
  }, []);

  const fetchAllTransactions = useCallback(() => {
    const user = FIREBASE_AUTH.currentUser;
    //console.log("user ", user);

    if (user) {
      const userDocRef = doc(FIREBASE_DB1, "transactions", user.uid);
      const unsubscribe = onSnapshot(
        collection(userDocRef, "userTransactions"),
        (snapShot) => {
          const transactionArray: Transaction[] = [];

          snapShot.forEach((doc) => {
            const data = doc.data() as Transaction;
            transactionArray.push(data);
          });
          // console.log(transactionArray, "transaction array");

          setTransactions(transactionArray);
        },
        (error) => {
          console.log(
            "error fetching users transaction in settle payments section.",
            error
          );
        }
      );
      return () => unsubscribe();
    } else {
      console.log("no users logged in settle payment section");
    }
  }, []);

  const renderItem = ({
    item,
    index,
  }: {
    item: Transaction;
    index: number;
  }) => (
    <TouchableOpacity
      key={index}
      style=
      {[
        styles.friendItem,
        index === transactions.length - 1 ? { borderBottomWidth: 0 } : {},
      ]}
      onPress={() => {navigation.navigate("FriendsDetails", {friend: item})}}
      >
      <Icon name="person" size={24} color="black" style={{ marginLeft: 17 }} />
      <Text
        style={{ fontSize: 20, color: "darkblue", marginLeft: 8, margin: 5 }}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      <View style={styles.topContainer}>
        <Text style={[styles.profileText, { color: "black" }]}>
          Settle a Payment
        </Text>
        <View style={styles.inputContainer}>
          <Icon
            name="search"
            size={24}
            color="black"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter a name"
            placeholderTextColor="white"
            value={name}
            onChangeText={(text: any) => setName(text)}
          />
        </View>
        <View style={styles.iconTextContainer}>
          <Icon name="people" size={30} color="black" />
          <Text style={styles.activeFriendsText}>All active friends</Text>
        </View>
        <View style={styles.divider} />
      </View>
      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={(item) => item.email}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  profileText: {
    fontSize: 22,
    textAlign: "center",
  },
  topContainer: {
    alignItems: "center",
    marginTop: "12%",
    width: "100%",
    paddingVertical: 20,
  },
  friendItem: {
    flexDirection: "row",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    alignItems: "center",
  },
  input: {
    width: "95%",
    height: "30%",
    textAlign: "left",
    flex: 1,
    paddingLeft: 10,
    fontSize: 18,
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    marginTop: "5%",
  },
  activeFriendsText: {
    fontSize: 20,
    paddingLeft: 10,
    color: "black",
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "black",
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
    width: "95%",
    borderRadius: 8,
    backgroundColor: "darkgrey",
    marginTop: "5%",
  },
  searchIcon: {
    padding: 10,
  },
});

export default PaymentScreen;
