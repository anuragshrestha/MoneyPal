import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import HomeScreenHeader from "../components/Home/HomeScreenHeader";
import ScreenWrapper from "../components/ScreenWrapper";
import ReturnInfo from "../components/Home/ReturnInfo";
import FriendsSection from "../components/Home/FriendsSection";

const HomeScreen = () => {
  return (
    <ScreenWrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HomeScreenHeader />
        <ReturnInfo />
        <FriendsSection />
      </ScrollView>
    </ScreenWrapper>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
