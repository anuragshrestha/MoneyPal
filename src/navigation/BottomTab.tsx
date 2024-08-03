import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddScreen from "../screens/AddScreen";
import AccountScreen from "../screens/AccountScreen";
import { useColors } from "../contexts/ColorContext";
import HomeStack from "./HomeStack";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { RootTabParamList, ScreenRouteProp, TabBarIconProps } from "../naviagtionTypes";

const Tab = createBottomTabNavigator<RootTabParamList>();

const BottomTab = () => {
  const { colors } = useColors();
  return (
      <Tab.Navigator
        screenOptions={({ route }: { route: ScreenRouteProp<keyof RootTabParamList> }) => ({
          headerShown: false,
          tabBarActiveTintColor: colors.primary_black,
          tabBarInactiveTintColor: colors.primary_black,
          tabBarStyle: {
            minHeight: 50,
            backgroundColor: colors.primary_white,
          },
          tabBarIcon: ({focused, color, size} : TabBarIconProps)=> {
            let iconName = "";

            if (route.name === 'HomeStack'){
              iconName = focused ? "home" : "home-outline";
            } else if(route.name === 'Add'){
              iconName = focused ? 'add-circle' : "add-circle-outline";
            } else if(route.name === 'Account'){
              iconName = focused ? 'person' : 'person-outline';
            }
             return <Ionicons name ={iconName} size={size} color={color} />
          }
        })}
      >
        <Tab.Screen name="HomeStack" component={HomeStack} options={{title: 'Home'}} />
        <Tab.Screen name="Add" component={AddScreen} />
        <Tab.Screen name="Account" component={AccountScreen} />
      </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({});
