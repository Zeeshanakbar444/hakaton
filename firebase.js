
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, onSnapshot, collection, addDoc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-storage.js";
const firebaseConfig = {
    apiKey: "AIzaSyBnyUEJVz2xbWx_uxPufFxwDihiPJImALI",
    authDomain: "hakaton-smit.firebaseapp.com",
    projectId: "hakaton-smit",
    storageBucket: "hakaton-smit.appspot.com",
    messagingSenderId: "1012228848871",
    appId: "1:1012228848871:web:aaed42a474929d283d3642",
    measurementId: "G-8GH42RKKZE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, createUserWithEmailAndPassword, db, doc, setDoc, signInWithEmailAndPassword, getDoc, getStorage, updateDoc, deleteDoc, ref, uploadBytesResumable, getDownloadURL, storage, onSnapshot, collection, addDoc }