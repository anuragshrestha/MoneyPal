import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Pressable,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import { useColors } from "../contexts/ColorContext";
import Icon from "react-native-vector-icons/Ionicons";
import { FIREBASE_AUTH } from "../firebase/FireBaseAuth";
import { FIREBASE_DB1 } from "../firebase/FireBaseAuth";
import {
  doc,
  Firestore,
  getDocs,
  collection,
  setDoc,
  onSnapshot,
} from "firebase/firestore";

interface Transaction {
  name: string;
  email: string;
  amount: string;
  transactionType: string;
}

const AddScreen = () => {
  const [name, setName] = useState<string>("");
  const [userName, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [interest, setInterest] = useState<string>("");
  const [transactionType, setTransactionType] = useState<string>("");
  const [isNameEntered, setIsNameEntered] = useState<boolean>(false);
  const [isIdInList, setIsIdInList] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { colors } = useColors();

  useEffect(() => {
    verify();
    const unsubscribe = fetchAllTransactions();
    return () => unsubscribe && unsubscribe();
  }, [isNameEntered, name]);

  const verify = useCallback(async () => {
    try {
      const allUsers = await getDocs(collection(FIREBASE_DB1, "users"));
      let foundMatch = false;

      //loop through each users in the collection
      allUsers.forEach((doc: { data: () => any }) => {
        const user = doc.data();
        const isEmailMatch = user.email.toLowerCase() === name.toLowerCase();

        if (isEmailMatch) {
          foundMatch = true;
          setIsIdInList(true);
          setUsername(user.name);
          console.log(user.name);

          setEmail(user.email);
          console.log("matched matched");
          return;
        }
      });

      if (!foundMatch) {
        setIsIdInList(false);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }, [name]);

  const saveTransactionDetails = useCallback(async () => {
    const transactionData = {
      amount: amount,
      interest: interest,
      transactionType: transactionType,
      name: userName,
      email: email,
      createdAt: new Date().toISOString(),
      interestEarned: 0,
    };

    try {
      const user = FIREBASE_AUTH.currentUser;

      if (user) {
        //reference to the current user document in the transations collection
        const userDocRef = doc(FIREBASE_DB1, "transactions", user.uid);

        // reference to the sub-collection userTransactions inside the current user document.
        const newTransactionRef = doc(
          collection(userDocRef, "userTransactions")
        );

        //save the transactions data in the doc
        await setDoc(newTransactionRef, transactionData);
        console.log("trasactions save succesfully ", user.uid);
        fetchAllTransactions();
      } else {
        console.log("no user logged in");
      }
    } catch (error) {
      console.log("error saving transaction details", error);
    }
  }, [amount, interest, transactionType, userName, email]);

  function verifyTransaction() {
    if (amount.length == 0) {
      Alert.alert("Enter Amount!", "please enter your amount!");
      return false;
    }

    if (interest.length == 0) {
      Alert.alert("Enter Interest rate!", "please enter Interest rate");
      return false;
    }

    if (parseFloat(interest) > 12) {
      Alert.alert(
        "High Interest rate!!",
        "Interest should not be more than 12%"
      );
      return false;
    }
    return true;
  }

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
          console.log("Error fetching real-time data: ", error);
        }
      );

      return () => unsubscribe();
    } else {
      console.log("no user's logged in");
    }
  }, []);

  function handleSubmit() {
    if (verifyTransaction()) {
      saveTransactionDetails();
      setName("");
      setUsername("");
      setAmount("");
      setInterest("");
      setTransactionType("");
      setEmail("");
      setIsNameEntered(false);
    }
  }

  function handleCancel() {
    setName("");
    setAmount("");
    setTransactionType("");
    setInterest("");
    setIsNameEntered(false);
  }

  function addFriend() {
    setIsNameEntered(true);
  }

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]{5}\.[^\s@]{3,}$/.test(email);
  const isValidPhoneNumber = (phone: string) => /^\d{10}$/.test(phone);

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.name.toLowerCase().includes(name.toLowerCase())
  );

  const showTypedName = filteredTransactions.length === 0 && name.length > 0;

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={[styles.text, { color: colors.primary_blue }]}>
              Add a Transaction
            </Text>
            {!isNameEntered ? (
              <View style={styles.name}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter name or gmail"
                  placeholderTextColor="grey"
                  value={name}
                  onChangeText={(text: any) => setName(text)}
                  onSubmitEditing={() => addFriend()}
                />
                {name.length === 0 && (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Icon
                      name="time-outline"
                      color="white"
                      size={25}
                      style={{ marginTop: 10, marginRight: 6, marginLeft: 26 }}
                    />
                    <Text style={styles.friendSugesstionText}>
                      Recently added transactions
                    </Text>
                  </View>
                )}

                {filteredTransactions.length > 0 || !isValidEmail(name) ? (
                  <View style={styles.friendListContainer}>
                    {filteredTransactions.map((friend, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          setName(friend.name);
                          setIsNameEntered(true);
                        }}
                      >
                        <View style={[styles.friendItem]}>
                          <Icon name="person" size={20} color="lightgrey" />
                          <Text
                            style={[
                              styles.suggestionItem,
                              {
                                color: "lightblue",
                                marginLeft: 5,
                                fontSize: 20,
                              },
                            ]}
                          >
                            {" "}
                            {friend.name}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                    {showTypedName && (
                      <View style={styles.friendItem}>
                        <Text
                          style={[
                            styles.suggestionItem,
                            { color: colors.primary_black },
                          ]}
                        >
                          {name.toLowerCase()}
                        </Text>
                      </View>
                    )}
                  </View>
                ) : (
                  isValidEmail(name) && (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "90%",
                        marginTop: 10,
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{ color: colors.primary_black, fontSize: 16 }}
                      >
                        {name.toLowerCase()}
                      </Text>
                      <Button
                        title={isIdInList ? "Add" : "Invite"}
                        onPress={isIdInList ? addFriend : handleCancel}
                      />
                    </View>
                  )
                )}
              </View>
            ) : (
              <>
                <View style={[styles.names, { width: "70%" }]}>
                  <Text
                    style={[
                      styles.label,
                      { color: colors.primary_black, marginRight: 23 },
                    ]}
                  >
                    Amount
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter amount"
                    value={amount}
                    onChangeText={setAmount}
                    keyboardType="numeric"
                  />
                </View>
                <View style={[styles.names, { width: "70%" }]}>
                  <Text
                    style={[
                      styles.label,
                      { color: colors.primary_black, marginRight: 23 },
                    ]}
                  >
                    Interest
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter interest rate"
                    value={interest}
                    onChangeText={setInterest}
                    keyboardType="numeric"
                  />
                </View>
                <View style={[styles.names, { width: 260 }]}>
                  <Text style={[styles.label, { color: colors.primary_black }]}>
                    Transaction
                  </Text>
                  <View style={styles.transactionButtons}>
                    <Pressable
                      style={[
                        styles.transactionTypeButton,
                        transactionType === "Lent" && styles.lentSelectedButton,
                      ]}
                      onPress={() => setTransactionType("Lent")}
                    >
                      <Text style={styles.buttonText}>Lent</Text>
                    </Pressable>
                    <Pressable
                      style={[
                        styles.transactionTypeButton,
                        transactionType === "Borrowed" &&
                          styles.borrowSelectedButton,
                      ]}
                      onPress={() => setTransactionType("Borrowed")}
                    >
                      <Text style={styles.buttonText}>Borrowed</Text>
                    </Pressable>
                  </View>
                </View>
                <View style={styles.buttonsView}>
                  <View style={styles.buttons}>
                    <Button title="Submit" onPress={handleSubmit} />
                  </View>
                  <View style={styles.buttons}>
                    <Button title="Cancel" onPress={handleCancel} color="red" />
                  </View>
                </View>
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default AddScreen;

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 15,
    width: "100%",
  },
  modalView: {
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  input: {
    width: "95%",
    height: 40,
    borderColor: "grey",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 6,
  },
  name: {
    alignItems: "center",
    marginBottom: 5,
    width: "100%",
    justifyContent: "center",
  },
  names: {
    alignItems: "center",
    marginBottom: 5,
    justifyContent: "center",
    flexDirection: "row",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 7,
  },
  transactionTypeButton: {
    padding: 10,
    margin: 3,
    backgroundColor: "white",
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
  },
  lentSelectedButton: {
    backgroundColor: "green",
  },
  borrowSelectedButton: {
    backgroundColor: "red",
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
  transactionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginRight: 17,
  },
  buttonsView: {
    padding: 10,
    margin: 5,
    flexDirection: "row",
    marginLeft: 50,
    paddingVertical: 10,
  },
  buttons: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 8,
    margin: 10,
    backgroundColor: "white",
  },
  suggestionItem: {
    fontSize: 18,
  },
  friendListContainer: {
    width: "100%",
    padding: 10,
  },
  friendItem: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    paddingVertical: 10,
    flexDirection: "row",
  },
  addButton: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "white",
    width: "19%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    marginBottom: 20,
  },
  friendSugesstion: {
    paddingBottom: 5,
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
    borderTopWidth: 2,
    borderTopColor: "white",
    marginTop: 5,
  },
  friendSugesstionText: {
    color: "lightgrey",
    marginRight: 65,
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    // marginBottom: 4
  },
  transactionItem: {
    padding: 10,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  transactionText: {
    fontSize: 16,
  },
});

function Collection(
  FIREBASE_DB1: Firestore,
  arg1: string
): import("@firebase/firestore").DocumentReference<
  unknown,
  import("@firebase/firestore").DocumentData
> {
  throw new Error("Function not implemented.");
}
