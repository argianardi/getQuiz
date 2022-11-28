import { getApps, initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBdcql-KauI5ZnzJl6uZG3tDOwgTiEYBdE",
  authDomain: "getquiz-auth.firebaseapp.com",
  projectId: "getquiz-auth",
  storageBucket: "getquiz-auth.appspot.com",
  messagingSenderId: "1005076674295",
  appId: "1:1005076674295:web:e0e78c3b0c560ad2f085f2",
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

export const FirebaseAuth = getAuth();

export const Authentication = () => {
  return FirebaseAuth;
};

export const SignUp = async (email, password) => {
  await createUserWithEmailAndPassword(FirebaseAuth, email, password);
};

export const SignIn = async (email, password) => {
  await signInWithEmailAndPassword(FirebaseAuth, email, password);
};

export const SignOut = async () => {
  await signOut(FirebaseAuth);
};

export const GetSignInErrorMessage = (code) => {
  switch (code) {
    case "auth/user-not-found":
      return "Your email is not registered";
    case "auth/wrong-password":
    default:
      return "Wrong password";
  }
};

export const GetSignUpErrorMessage = (code) => {
  switch (code) {
    case "auth/email-already-in-use":
      return "Email already in use";
    default:
      return "Sign Up Error";
  }
};
