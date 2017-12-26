angular.module('firebaseConfig', ['firebase'])

.run(function(){

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDSLAQ-VDrQhweJ4Hclad8Y8s3PGQGLKqk",
    authDomain: "ipot-mobile-learning.firebaseapp.com",
    databaseURL: "https://ipot-mobile-learning.firebaseio.com",
    storageBucket: "ipot-mobile-learning.appspot.com",
  };
  firebase.initializeApp(config);

})