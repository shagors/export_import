import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAUjw_baVA90fr7GJyk9DnrOQjD4tjoJ8M",
  authDomain: "export-import-9f305.firebaseapp.com",
  projectId: "export-import-9f305",
  storageBucket: "export-import-9f305.appspot.com",
  messagingSenderId: "1020120163952",
  appId: "1:1020120163952:web:b0c42fa2656eed6f8336b5",
  measurementId: "G-R4GH0KJKGS",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;