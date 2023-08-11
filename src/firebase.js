import { initializeApp } from "@firebase/app";
import { getStorage } from "@firebase/storage";

const firebaseConfig = {
  
  apiKey: "AIzaSyC06paHXURucyrzSd6OaU_iFYqsqI5nO1I",
  authDomain: "intelligentmarketingagen-a3e0b.firebaseapp.com",
  projectId: "intelligentmarketingagen-a3e0b",
  storageBucket: "intelligentmarketingagen-a3e0b.appspot.com",
  messagingSenderId: "437265150956",
  appId: "1:437265150956:web:cba47acc18c47920bd46c9",
  measurementId: "G-QCWJY0LQQV"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);