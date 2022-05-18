// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGN3Wh54wy9qtnlJgIFtFZ3JLxL4wjduE",
  authDomain: "to-do-app-daba8.firebaseapp.com",
  projectId: "to-do-app-daba8",
  storageBucket: "to-do-app-daba8.appspot.com",
  messagingSenderId: "48230111165",
  appId: "1:48230111165:web:2c3c92f00512ee957d24d4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;