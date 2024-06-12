import { initializeApp, FirebaseApp } from "firebase/app";
import { getStorage, FirebaseStorage } from "firebase/storage";


const firebaseConfig: { 
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
} = {
  apiKey: "AIzaSyCZThpep6oxVIAjO0PNJxFoupkPOENt1Ps",
  authDomain: "online-course-management-e9629.firebaseapp.com",
  projectId: "online-course-management-e9629",
  storageBucket: "online-course-management-e9629.appspot.com",
  messagingSenderId: "54663812997",
  appId: "1:54663812997:web:8f62c18d76ab256d2416ec",
  measurementId: "G-PHTVH7Z96B"
};


const app: FirebaseApp = initializeApp(firebaseConfig);
const storage: FirebaseStorage = getStorage(app);

export { storage };
