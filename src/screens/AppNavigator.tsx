import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTab from "../navigation/BottomTab";
import AuthStack from "../AuthStack/AuthStack";
import { useUser } from "../contexts/UserProvider";
import TransitionScreen from "./TransitionScreen";
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { user, isAuthenticating } = useUser();

  if(isAuthenticating) return <TransitionScreen/>
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="BottomTab" component={BottomTab} />
        ) : (
          <Stack.Screen name="AuthStack" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
