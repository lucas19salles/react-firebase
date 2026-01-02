import { initializeApp } from "firebase/app"; // função para iniciar o firebase em uma aplicação
import { getFirestore } from "firebase/firestore"; // leitura de dados em um banco de dados do cloud firestore
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCxKUjd2f7l4cp6or89Liu_HOWZ3NZkCIw",
  authDomain: "curso-b6c76.firebaseapp.com",
  projectId: "curso-b6c76",
  storageBucket: "curso-b6c76.firebasestorage.app",
  messagingSenderId: "90242871312",
  appId: "1:90242871312:web:0b5249039efc09c3a31a95",
  measurementId: "G-40N524VMH9",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
