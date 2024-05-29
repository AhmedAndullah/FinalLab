import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, initializeAuth, browserSessionPersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: "AIzaSyA2551aRlR5a0Y7zdoVWvml0vtzQh3hkGY",
  authDomain: "quiz-app-257cd.firebaseapp.com",
  projectId: "quiz-app-257cd",
  storageBucket: "quiz-app-257cd.appspot.com",
  messagingSenderId: "275062428650",
  appId: "1:275062428650:web:97aef13adef87be1ad9893",
  measurementId: "G-EFT1QY5TD7"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = initializeAuth(app, {
  persistence: browserSessionPersistence,
});

export { app, auth };
