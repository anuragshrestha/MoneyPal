import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../components/ScreenWrapper";
import { useColors } from "../contexts/ColorContext";
import {
  AccountScreenNavigationProp,
  RootStackParamList,
} from "../naviagtionTypes";
import { Image } from "react-native";
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebase/FireBaseAuth";
import { useNavigation } from "@react-navigation/native";
import { get, ref } from "firebase/database";

const AccountScreen = () => {
  const { colors } = useColors();
  const navigation = useNavigation<AccountScreenNavigationProp>();
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    
    const fetchUserData = async () => {
      const user = FIREBASE_AUTH.currentUser;
      if (user) {
        const docRef = ref(FIREBASE_DB, `users/${user.uid}`);
        const onSnapShot = await get(docRef);

        if(onSnapShot.exists()){
          const userData = onSnapShot.val();
           setUserName(userData.name);
        }
      }
    };
     fetchUserData();
  });

  function editProfileButton() {
    console.log("edit profile button is pressed");
  }

  function navigateScreen(screen: string) {
    console.log(`naviagtig to ${screen} screen`);
  }

  const logOut = async () => {
    setIsLoading(true);
    try {
      await signOut(FIREBASE_AUTH);
      console.log("log out sucessfully");

      navigation.navigate("LogIn");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  function navigationScreen(screen: keyof RootStackParamList) {
    navigation.navigate(screen);
  }

  return (
    <ScreenWrapper>
      <ScrollView>
        <Text style={[styles.profileText, { color: colors.primary_black }]}>
          Your Profile
        </Text>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 25,
          }}
        >
          <Image
            source={require("../.././assets/demoimage.jpeg")}
            style={styles.profileImage}
          />
          <Text style={[{ color: colors.primary_black }, styles.nameText]}>
            {userName ? userName : " "}
          </Text>
          <View style={styles.borderContainer}>
            <View />
            <Pressable
              style={({ pressed }: { pressed: boolean }) => [
                styles.buttonContainer,
                pressed && styles.pressed,
              ]}
              onPress={editProfileButton}
            >
              <Text style={styles.buttonText}>Edit Profile</Text>
            </Pressable>
          </View>
        </View>
        <View>
          <Pressable
            onPress={() => navigateScreen("Payment")}
            style={({ pressed }: { pressed: boolean }) => [
              styles.menuItem,
              pressed && styles.pressed,
            ]}
          >
            <Text style={[{ color: colors.primary_black }, styles.menuText]}>
              Payment Records
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigateScreen("Subscriptions")}
            style={({ pressed }: { pressed: boolean }) => [
              styles.menuItem,
              pressed && styles.pressed,
            ]}
          >
            <Text style={[{ color: colors.primary_black }, styles.menuText]}>
              Your subscriptions
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigateScreen("Settings")}
            style={({ pressed }: { pressed: boolean }) => [
              styles.menuItem,
              pressed && styles.pressed,
            ]}
          >
            <Text style={[{ color: colors.primary_black }, styles.menuText]}>
              Settings
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigateScreen("Contact")}
            style={({ pressed }: { pressed: boolean }) => [
              styles.menuItem,
              pressed && styles.pressed,
            ]}
          >
            <Text style={[{ color: colors.primary_black }, styles.menuText]}>
              Contact us
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigateScreen("FeedBack")}
            style={({ pressed }: { pressed: boolean }) => [
              styles.menuItem,
              pressed && styles.pressed,
            ]}
          >
            <Text style={[{ color: colors.primary_black }, styles.menuText]}>
              Send feedback
            </Text>
          </Pressable>
        </View>
        <Pressable
          onPress={() => logOut()}
          style={({ pressed }: { pressed: boolean }) => [
            styles.logOutItem,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.logout}>Log out</Text>
        </Pressable>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  profileText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 5,
  },
  nameText: {
    paddingTop: 5,
    fontSize: 18,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  borderContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
    position: "relative",
    paddingBottom: 10,
  },
  borderLine: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "grey",
  },
  buttonContainer: {
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 8,
    zIndex: 1,
  },
  buttonText: {
    color: "blue",
    fontSize: 16,
    fontWeight: "bold",
  },
  menuItem: {
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    width: "100%",
    paddingVertical: 10,
  },
  menuText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  logout: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  logOutItem: {
    borderWidth: 1,
    backgroundColor: "red",
    paddingVertical: 5,
    width: "25%",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 150,
    marginLeft: 130,
  },
  pressed: {
    opacity: 0.7,
  },
});

export default AccountScreen;
