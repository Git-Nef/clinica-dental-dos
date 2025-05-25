// Importa lo necesario
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// Configuración de tu app web en Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCS4ULc6xsN4twnzTbkK12_UJTiqr75e98",
  authDomain: "sm25-e69a9.firebaseapp.com",
  projectId: "sm25-e69a9",
  storageBucket: "sm25-e69a9.firebasestorage.app",
  messagingSenderId: "1051104852373",
  appId: "1:1051104852373:web:d7b9075bd9ccb85bfe9e9c"
}

export const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export { db }

