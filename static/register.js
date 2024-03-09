// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAM4keOb3CfDWnLPkl6U5zMjry8v_h8iJQ",
    authDomain: "login-df479.firebaseapp.com",
    projectId: "login-df479",
    storageBucket: "login-df479.appspot.com",
    messagingSenderId: "911572639057",
    appId: "1:911572639057:web:506a2d9ee75f9c49e1c770"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en'
const provider = new GoogleAuthProvider();

document.addEventListener("DOMContentLoaded", function () {
    const googleLogin = document.getElementById("google-login-btn");

    googleLogin.addEventListener("click", function () {
        console.log("Google button clicked");
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                console.log(user);
                localStorage.setItem("user", JSON.stringify(user))
                window.location.replace("/DESIGN");
            })
            .catch((error) => {
                console.error('Error during Google login:', error);
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    });
});

function showInfo(infoId) {
    var infoPopup = document.getElementById(infoId);
    var questionIcon = document.getElementById('question-icon');
  
    // Get the position of the icon
    var iconRect = questionIcon.getBoundingClientRect();
    
    // Set the position of the popup above the icon
    infoPopup.style.left = iconRect.left + 'px';
    infoPopup.style.top = (iconRect.top - infoPopup.offsetHeight) + 'px';
  
    // Toggle the display of the information popup
    infoPopup.style.display = infoPopup.style.display === "block" ? "none" : "block";
  }
  


