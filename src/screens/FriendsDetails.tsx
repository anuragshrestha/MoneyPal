import { View, Text, TextInput, StyleSheet, Button, Alert } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { AccountStackParamList } from "../navigation/AccountStack";
import { FIREBASE_AUTH, FIREBASE_DB1 } from "../firebase/FireBaseAuth";
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Define the type for the route
type FriendsDetailsRouteProp = RouteProp<
  AccountStackParamList,
  "FriendsDetails"
>;
interface FriendsDetailsProps {
  route: FriendsDetailsRouteProp;
}

interface Transaction {
  id: string;
  name: string;
  email: string;
  amount: string;
  transactionType: string;
  interest: string;
  interestEarned: string;
}

const FriendsDetails = ({ route, }: FriendsDetailsProps) => {
  const { friend } = route.params;
  const transactionType = friend.transactionType;
  const friendEmail = friend.email;
  const friendId = friend.id;
  const firstName = friend.name.split(" ")[0];
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const navigation = useNavigation<NativeStackNavigationProp<AccountStackParamList>>();
  
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
        (snapShot) => {
          const transactionArray: Transaction[] = [];

          snapShot.forEach((doc) => {
            const data = { ...doc.data(), id: doc.id} as Transaction;
            transactionArray.push(data);
          });
           setTransactions(transactionArray);
        },
        (error) => {
          console.log(
            "error fetching user transaction from friends details screen",
            error
          );
        }
      );
       return () => unsubscribe();
    }else {
      console.log("no user's logged in");
    }
  }, []);

  const saveTransaction = useCallback(() => {

      const enteredAmount = parseFloat(amount);
      const transactionDocRef = transactions.find((t) => t.id === friendId);
      console.log(transactionDocRef);
      console.log(friendId);
      
      
     

      // check if the choosen friend email is in our database.
      if(!transactionDocRef) return ;
     
      let curAmount = parseFloat(transactionDocRef.amount);
      let curInterestAmount = parseFloat(transactionDocRef.interestEarned)
     let totalAvailableAmount = curAmount + curInterestAmount;

      if(enteredAmount > totalAvailableAmount){
        Alert.alert("Wallet warning", "Entered amount should be less than the total remaning amount!");
        return;
      }
 
       let newAmount = 0;
       let newInterestEarned = curInterestAmount;

       if(enteredAmount <= curAmount){
          newAmount = curAmount - enteredAmount;
       }else{
         let remaningAmount = enteredAmount - curAmount;
         newAmount = 0;
         newInterestEarned = curInterestAmount - remaningAmount;
       }

       // get the current user

       const user = FIREBASE_AUTH.currentUser;

       if(user){
        const userDocRef = doc(FIREBASE_DB1, "transactions", user.uid);

        const userTransactionRef = doc(userDocRef, "userTransactions", friendId);

        // update the data in the user document
        setDoc(userTransactionRef, {amount: newAmount, interestEarned: newInterestEarned}, {merge: true}).then(()=> {
          console.log("Transaction updated successfully");
          
        }).catch((error) => {
          console.log('error updating transaction', error);
          
        });
       }


  }, [amount, friendId, transactions]);

  function submitButton() {

    saveTransaction();
    setAmount("");
    navigation.navigate("SettlePayments")
    console.log("pressed submit button", amount);
  }

  function cancelButton() {
    console.log("pressed canceled button");
    setAmount("");
    navigation.navigate("SettlePayments")
  }
  return (
    <View style={{flex:1, backgroundColor:'black'}}>
    <View style={styles.mainContainer}>
      {transactionType === "Lent" ? (
        <Text style={{ fontSize: 20, color:'white' }}>How much did {firstName} paid you?</Text>
      ) : (
        <Text style={{ fontSize: 20, color:'white'}}>How much you paid to {firstName}?</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Enter the paid amount"
        placeholderTextColor="black"
        keyboardType="numeric"
        value={amount}
        onChangeText={(text: any) => setAmount(text)}
      />
      <View style={styles.buttonContainer}>
        <View style={[styles.button, {marginRight: 5}]}>
          <Button title="Submit" onPress={submitButton} />
        </View>
        <View style={styles.button}>
          <Button title="Cancel" onPress={cancelButton} color="red" />
        </View>
      </View>
      {/* <Text style={{ marginTop: 100 }}> A flatlist will be shown here </Text> */}
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  mainContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: "5%",
    backgroundColor: "black", 
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "38%",
  },
  button: {
    borderWidth: 1,
    backgroundColor: "lightgrey",
    borderRadius: 6,
  },
});

export default FriendsDetails;
