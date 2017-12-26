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

/*

.service("TodoExample", ["$firebaseArray", function($firebaseArray){
    var ref = firebase.database().ref().child("todos");
    var items = $firebaseArray(ref);
    var todos = {
        items: items,
        addItem: function(title){
            items.$add({
                title: title,
                finished: false
            })
        },
        setFinished: function(item, newV){
            item.finished = newV;
            items.$save(item);
        }
    }
    return todos;
}])

*/