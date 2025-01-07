import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCvf0dC3i4DAFrC3lRvwIkJ3FVCu8eWgJo",
  authDomain: "user-profiles-react.firebaseapp.com",
  projectId: "user-profiles-react",
  storageBucket: "user-profiles-react.firebasestorage.app",
  messagingSenderId: "60411568997",
  appId: "1:60411568997:web:7dcb4827e51fa86125b78c",
};

const app = initializeApp(firebaseConfig);

export { app };
