import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBzP3W1ZAQt7Ek-Hp3fxxZAc5xcfnHfpEI",
    authDomain: "coffeeshop-34152.firebaseapp.com",
    projectId: "coffeeshop-34152",
    storageBucket: "coffeeshop-34152.firebasestorage.app",
    messagingSenderId: "188026004530",
    appId: "1:188026004530:web:a4cb3cba593e73fb3ec82b"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };


