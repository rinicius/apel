import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBmjC9MRFd-Q3bg1_JcARkCX4kk_Ah-P0g",
  authDomain: "apel-a997a.firebaseapp.com",
  databaseURL: "https://apel-a997a.firebaseio.com",
  projectId: "apel-a997a",
  storageBucket: "apel-a997a.appspot.com",
  messagingSenderId: "552662156494",
  appId: "1:552662156494:web:2e082e4920bcbbe0cdfc9f",
  measurementId: "G-G61RZYQFFJ",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const StorageConnection = firebase.storage();
