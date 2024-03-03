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
const provider = new GoogleAuthProvider();

const googleLogin = document.getElementById("google-login-btn");
googleLogin.addEventListener("click", function () {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        const user = result.user;
        console.log(user);
        window.location.href = "../home.html";

        
      }).catch((error) => {
        console.error('Error during Google login:', error);
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    });

function updateUserProfile(user) {
    const userEmail = user.email;

    document.getElementById("userEmail").textContent = userEmail;
}




