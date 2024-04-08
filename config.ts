import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcDe8W5HHwphlxoE48r0BhxIj8JxdQSbs",
  authDomain: "titulacion-fcf21.firebaseapp.com",
  projectId: "titulacion-fcf21",
  storageBucket: "titulacion-fcf21.appspot.com",
  messagingSenderId: "315704269243",
  appId: "1:315704269243:web:2829facef69998f5c74c9e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage };
