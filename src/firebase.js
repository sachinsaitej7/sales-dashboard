


  import firebase from "firebase/app";
  // If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
  // import * as firebase from "firebase/app"
  
  // If you enabled Analytics in your project, add the Firebase SDK for Analytics
  import "firebase/analytics";
  
  // Add the Firebase products that you want to use
  import "firebase/auth";
  import "firebase/firestore";
  
  import "./firebase.js";
  
  const firebaseConfig = {
    apiKey: "AIzaSyCYW2B7Y4wL3FEIa2A3NzTMbxA7mQXfhb8",
    authDomain: "sales-dashboard-ab296.firebaseapp.com",
    databaseURL: "https://sales-dashboard-ab296.firebaseio.com",
    projectId: "sales-dashboard-ab296",
    storageBucket: "sales-dashboard-ab296.appspot.com",
    messagingSenderId: "855181226205",
    appId: "1:855181226205:web:2fe00a7960c651628feb34",
    measurementId: "G-DKN5ZBNL9Y"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase;