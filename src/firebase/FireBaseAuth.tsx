import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore} from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCjcqwJtA7P2tkbkGj16Og322QOMAIhIJw",
  authDomain: "lendven-37dcb.firebaseapp.com",
  databaseURL: "https://lendven-37dcb-default-rtdb.firebaseio.com",
  projectId: "lendven-37dcb",
  storageBucket: "lendven-37dcb.appspot.com",
  messagingSenderId: "308332149137",
  appId: "1:308332149137:web:a795dc83963f7343100230",
  measurementId: "G-8RT03C1MZ2"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {persistence: getReactNativePersistence(ReactNativeAsyncStorage)});
//export const FIREBASE_DB = getDatabase(FIREBASE_APP);
export const FIREBASE_DB1 = getFirestore(FIREBASE_APP);
