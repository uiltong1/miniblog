import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-GxdA2xYsAKS_vEKH7kFgiI1SlfdsYNA",
  authDomain: "miniblog-f6001.firebaseapp.com",
  projectId: "miniblog-f6001",
  storageBucket: "miniblog-f6001.appspot.com",
  messagingSenderId: "1019742291925",
  appId: "1:1019742291925:web:362d8c5e031ef33cf99f5c",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
