angular.module('firebaseConfig', ['firebase'])

.run(function(){

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDvoRJw0G3te3xRv94gajd_MSvDzYjo2KM",
    authDomain: "ipot-78ed1.firebaseapp.com",
    databaseURL: "https://ipot-78ed1.firebaseio.com",
    storageBucket: "ipot-78ed1.appspot.com",
  };
  firebase.initializeApp(config);

})

