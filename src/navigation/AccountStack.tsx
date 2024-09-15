import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native"; 
import "./../screens/AccountScreen";
import AccountScreen from "./../screens/AccountScreen";
import PaymentScreen from "../screens/PaymentScreen";
import FriendsDetails from "../screens/FriendsDetails";

interface Transaction {
    name: string;
    email: string;
    amount: string;
    transactionType: string;
    interest: string;
    interestEarned: string;
  }

// Define the ParamList for your stack
export type AccountStackParamList = {
    Account: undefined;
    SettlePayments: undefined;
    FriendsDetails: { friend: Transaction };
  };
const  Stack = createNativeStackNavigator<AccountStackParamList>();

const AccountStack = () => {
   
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
       <Stack.Screen name="Account" component={AccountScreen}/>
       <Stack.Screen name="SettlePayments" component={PaymentScreen} />
       <Stack.Screen  name="FriendsDetails" component={FriendsDetails}/>
        </Stack.Navigator>
    )
}

export default AccountStack;