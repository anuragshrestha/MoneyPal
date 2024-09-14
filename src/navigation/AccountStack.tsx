import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native"; 
import "./../screens/AccountScreen";
import AccountScreen from "./../screens/AccountScreen";
import PaymentScreen from "../screens/PaymentScreen";

const  Stack = createNativeStackNavigator();

const AccountStack = () => {
   
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
       <Stack.Screen name="Account" component={AccountScreen}/>
       <Stack.Screen name="SettlePayments" component={PaymentScreen} />
        </Stack.Navigator>
    )
}

export default AccountStack;