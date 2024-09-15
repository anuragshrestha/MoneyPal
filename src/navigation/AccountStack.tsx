import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import "./../screens/AccountScreen";
import AccountScreen from "./../screens/AccountScreen";
import PaymentScreen from "../screens/PaymentScreen";
import FriendsDetails from "../screens/FriendsDetails";
import Ionicons from "react-native-vector-icons/Ionicons";

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
const Stack = createNativeStackNavigator<AccountStackParamList>();

const AccountStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{
          headerShown: false, 
        }}
      />
      <Stack.Screen name="SettlePayments" component={PaymentScreen}  options={({navigation}) => ({
        headerLeft: () => (
            <Ionicons  name="arrow-back" size={28} color='black' onPress={() => navigation.goBack()}/>
        ),
        headerTitle: "",
        headerStyle:{
            backgroundColor: 'white'
        }
      })}/>
      <Stack.Screen
        name="FriendsDetails"
        component={FriendsDetails}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={28}
              color="black"
              onPress={() => navigation.goBack()}
            />
          ),
          headerTitle: "",
          headerStyle: {
            backgroundColor: "white",
          },
        })}
      />
    </Stack.Navigator>
  );
};

export default AccountStack;
