import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import App from './App';

const firebaseConfig = {
  apiKey: "AIzaSyAQdF8nhhAbxQKVdbfloGbKFpOxxU5KU3E",
  authDomain: "gamelogged-fb32c.firebaseapp.com",
  projectId: "gamelogged-fb32c",
  storageBucket: "gamelogged-fb32c.firebasestorage.app",
  messagingSenderId: "14452901509",
  appId: "1:14452901509:web:fd1f2a20388dcd2e5c0bec",
  measurementId: "G-GKT5NN3T6G"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
