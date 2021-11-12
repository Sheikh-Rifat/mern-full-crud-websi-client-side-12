import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";

const initializeAuthentication = () => {
  // initialize firebase
  initializeApp(firebaseConfig);
};

export default initializeAuthentication;
