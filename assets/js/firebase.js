$(document).ready(() => {
	initFirebase();
});

function initFirebase(){
    const firebaseConfig = {
        apiKey: "AIzaSyA5Z029X1_OS3-xOJ0qqoL3rLU109H1IS0",
        authDomain: "chambra-chat.firebaseapp.com",
        databaseURL: "https://chambra-chat.firebaseio.com",
        projectId: "chambra-chat",
        storageBucket: "chambra-chat.appspot.com",
        messagingSenderId: "894331302194",
        appId: "1:894331302194:web:24069cdc304fccab49a72b"
    };

    // Initialize Firebase
    const initFirebase = firebase.initializeApp(firebaseConfig);
    const database = firebase.database();
}
