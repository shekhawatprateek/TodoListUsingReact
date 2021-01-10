// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
        apiKey: "AIzaSyCKYDaK-eFPd83T2rsaMyX2a80_Dz6zs_8",
        authDomain: "todo-app-pss.firebaseapp.com",
        projectId: "todo-app-pss",
        storageBucket: "todo-app-pss.appspot.com",
        messagingSenderId: "636558011086",
        appId: "1:636558011086:web:7da2b728470e4cfcd2fe9f",
        measurementId: "G-SESLZBKVRM"
    
    
});

const db = firebaseApp.firestore();

export default db;