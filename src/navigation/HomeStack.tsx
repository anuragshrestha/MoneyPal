import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NotificationScreen from "../screens/NotificationScreen";
import HomeScreen from "../screens/HomeScreen";

const Stack = createNativeStackNavigator();

function HomeStack(){
    return (
          <Stack.Navigator screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Notification" component={NotificationScreen} />
          </Stack.Navigator>
      );
};

export default HomeStack;