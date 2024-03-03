import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyAhV_j9bJ_9Jb8aFB3MD7HV7cbtXeHL4_Q",
    authDomain: "login-e9fab.firebaseapp.com",
    projectId: "login-e9fab",
    storageBucket: "login-e9fab.appspot.com",
    messagingSenderId: "226958724103",
    appId: "1:226958724103:web:bbe71c75f4575741b0eea2"
  };
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function updateUserProfile(user) {
    const userEmail = user ? user.email : "Guest"; // Set to "Guest" if the user is not logged in

    // Update the HTML element with id "userEmail" to display the user's email
    const userEmailElement = document.getElementById("userEmail");
    if (userEmailElement) {
        userEmailElement.textContent = userEmail;
    }
}

// Listen for changes in the authentication state
onAuthStateChanged(auth, (user) => {
    updateUserProfile(user);
});

// Optionally, you can use updateUserProfile() to update the user's profile immediately after the page loads
document.addEventListener("DOMContentLoaded", function () {
    updateUserProfile(auth.currentUser);
});