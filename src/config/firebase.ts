import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCZThpep6oxVIAjO0PNJxFoupkPOENt1Ps",
  authDomain: "online-course-management-e9629.firebaseapp.com",
  projectId: "online-course-management-e9629",
  storageBucket: "online-course-management-e9629.appspot.com",
  messagingSenderId: "54663812997",
  appId: "1:54663812997:web:8f62c18d76ab256d2416ec",
  measurementId: "G-PHTVH7Z96B",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
