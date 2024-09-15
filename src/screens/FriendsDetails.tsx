import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import React, { useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { AccountStackParamList } from "../navigation/AccountStack";

// Define the type for the route
type FriendsDetailsRouteProp = RouteProp<
  AccountStackParamList,
  "FriendsDetails"
>;
interface FriendsDetailsProps {
  route: FriendsDetailsRouteProp;
}

const FriendsDetails = ({ route }: FriendsDetailsProps) => {
  const { friend } = route.params;
  const transactionType = friend.transactionType;
  const firstName = friend.name.split(" ")[0];
  const [amount, setAmount] = useState('');

  function submitButton() {
    console.log("pressed submit button", amount);
  }

  function cancelButton() {
    console.log("pressed canceled button");
    setAmount('')
  }
  return (
    <View style={styles.mainContainer}>
      {transactionType === "Lent" ? (
        <Text style={{ fontSize: 20 }}>How much did {firstName} paid you?</Text>
      ) : (
        <Text style={{ fontSize: 20 }}>How much you paid to {firstName}?</Text>
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
        <View style={styles.button}>
          <Button title="Submit" onPress={submitButton} />
        </View>
        <View style={styles.button}>
          <Button title="Cancel" onPress={cancelButton} color="red" />
        </View>
      </View>
      <Text style={{marginTop: 100}}> A flatlist will be shown here </Text>
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
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "38%",
  },
  button: { 
    borderWidth: 1, backgroundColor: "lightgrey", borderRadius: 6 },
});

export default FriendsDetails;
