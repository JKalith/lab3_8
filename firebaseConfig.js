
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyDoq5FFdIenk9EZdyEUTYyulMTlqsupf7A",
  authDomain: "lab2-appfruit-e7cc2.firebaseapp.com",
  projectId: "lab2-appfruit-e7cc2",
  storageBucket: "lab2-appfruit-e7cc2.firebasestorage.app",
  messagingSenderId: "807818708958",
  appId: "1:807818708958:web:f63ace87d0b24591f9bf4f"
};
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { app, db };

