// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBi8SurrjBq21mgNkxc2_Rf3NXFtOijdgw",
  authDomain: "stylish-fashion-images.firebaseapp.com",
  projectId: "stylish-fashion-images",
  storageBucket: "stylish-fashion-images.appspot.com",
  messagingSenderId: "119791382863",
  appId: "1:119791382863:web:d027eaf4918710e342d53a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;