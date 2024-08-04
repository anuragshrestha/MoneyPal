import React, { useCallback, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH} from "../firebase/FireBaseAuth";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";


const LogInScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<any>();


  const handleSignIn = async() => {
     try{
      const userCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, username, password);
      console.log('user logged in: ', userCredential.user);
      navigation.navigate('BottomTab');
     } catch(error){
      Alert.alert("Error", "Incorrect email or password!!");
     }
  };

  return (
    
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.welcomeText}>Welcome to MoneyPal</Text>
      <View style={styles.mainView}>
        <Text style={styles.text}>User name</Text>
        <View style={styles.inputContainer}>
          <Icon name="user" size={20} color="black" style={styles.icon} />
          <TextInput
            style={styles.label}
            placeholder="Enter your email"
            placeholderTextColor="grey"
            value={username}
            onChangeText={(text: string) => setUsername(text.toLowerCase())}
          />
        </View>
        <Text style={styles.text}>Password</Text>
        <View style={styles.inputContainer}>
          <Icon name="envelope" size={20} color="black" style={styles.icon} />
          <TextInput
            style={styles.label}
            placeholder="Enter password"
            placeholderTextColor="grey"
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <LinearGradient
            colors={["orange", "purple"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientButton}
          >
            <TouchableOpacity style={styles.button} onPress={handleSignIn}>
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            colors={["orange", "purple"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientButton}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("SignUp")}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    paddingTop: 100,
  },
  welcomeText: {
    fontSize: 26,
    marginBottom: 20,
    color: "maroon",
    fontWeight: "bold",
    textAlign: "center",
  },
  mainView: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 120,
    padding: 60,
  },
  text: { fontSize: 26, marginTop: 10, paddingLeft: 5 },
  label: {
    flex: 1,
    padding: 10,
    color: "black",
  },
  button: {
    height: 28,
    margin: 5,
  },
  icon: {
    marginRight: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    margin: 5,
    paddingLeft: 10,
    backgroundColor: "lightblue",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  gradientButton: {
    borderRadius: 6,
    margin: 5,
    width: "46%",
    marginTop: 10,
  },
});

export default LogInScreen;
