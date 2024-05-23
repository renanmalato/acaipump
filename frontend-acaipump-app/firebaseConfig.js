import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCLtpy4Il19JuCxK8ZWqBt1O1somZrxqUE",
  authDomain: "authenification-b4dc9.firebaseapp.com",
  projectId: "authenification-b4dc9",
  storageBucket: "authenification-b4dc9.appspot.com",
  messagingSenderId: "284645295644",
  appId: "1:284645295644:web:f3d49b4d97b8e66217c1d9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

// ios:  284645295644-p7hsg1l6c0gfaofrnmdjcrt2iva88hll.apps.googleusercontent.com