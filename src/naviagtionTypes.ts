// navigationTypes.ts
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  LogIn: undefined;
  Account: undefined;
  Payment: undefined;
  Subscriptions: undefined;
  Settings: undefined;
  Contact: undefined;
  FeedBack: undefined;
};

export type AccountScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Account'
>;



export type RootTabParamList = {
  HomeStack: undefined;
  Add: undefined;
  Account: undefined;
};
export interface TabBarIconProps {
  focused: boolean;
  color: string;
  size: number;
}

export type BottomTabNavigationProps = BottomTabNavigationProp<RootTabParamList>;

export type ScreenRouteProp<RouteName extends keyof RootTabParamList> = RouteProp<RootTabParamList, RouteName>;
