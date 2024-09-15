import { View, Text } from "react-native";
import React from "react";
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

  return (
    <View style={{flex:1, alignItems: 'center', marginTop: '15%'}}>
        {transactionType === "Lent" ? ( 
           <Text>How much did {firstName} paid you?</Text>)
        : (<Text>How much you paid to {firstName}</Text>)}
    
      <Text>{friend.name}</Text>
    </View>
  );
};

export default FriendsDetails;
