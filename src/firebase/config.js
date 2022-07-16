// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite'; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDu08x_5So9Z8IAzmTXoir_T5lRPoUaPiY",
  authDomain: "react-cursos-86b4f.firebaseapp.com",
  projectId: "react-cursos-86b4f",
  storageBucket: "react-cursos-86b4f.appspot.com",
  messagingSenderId: "792005720713",
  appId: "1:792005720713:web:5df09e2be6d94ea0fce458"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig); // iniciamos la app con la configuracion de firebase 
export const FirebaseAuth = getAuth( FirebaseApp ); // obtenemos el objeto de autenticacion de firebase para poder usarlo en el resto de la aplicacion
export const FirebaseDB = getFirestore( FirebaseApp ); // obtenemos el objeto de firestore de firebase para poder usarlo en el resto de la aplicacion
