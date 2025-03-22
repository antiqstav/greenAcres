// firebase initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import {
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyBdtXeJeeT0ooE8yHsbMpUDVeXuDwkGAKk",
  authDomain: "agrilife-96ce0.firebaseapp.com",
  projectId: "agrilife-96ce0",
  storageBucket: "agrilife-96ce0.firebasestorage.app",
  messagingSenderId: "843694801338",
  appId: "1:843694801338:web:eaac054371ac115316dd83",
  measurementId: "G-Z9P0Q4RQ0H"
};

// firebase configuration
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// form handling
const login = document.getElementById("login");
const register = document.getElementById("register");

// login logic
document.getElementById("login").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = login.username.value;
  const password = login.password.value;
  const docname = username + "-" + password;

  console.log(docname);

  const docRef = doc(db, "crops", docname);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    alert("Welcome, " + username);
    window.location.replace("console.html");
  }
  else {
    alert("Invalid username or password");
    console.log("No such user with username (" + username + ")")
  }

  login.reset();
});

// register logic
document.getElementById("register").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = register.username.value;
  const password = register.password.value;
  if (password.length < 8) {
    alert("Password should be at least 8 characters long.");
    // maybe add reference for password requirements?
    return;
  }
  const docname = username + "-" + password;

  const docRef = doc(db, "crops", docname);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    alert("User already exists with username " + username + ". Please try another username.");
  }
  else {
    console.log("Registered user " + username + ". Check Firebase for password details.")
    const docRef = doc(db, "crops", "sampleInput");
    const docSnap = await getDoc(docRef);
    const sample = docSnap.data();
    await setDoc(doc(db, "crops", docname), sample);
    alert("User registered successfully. Please login to continue.");
  }

  register.reset();
});