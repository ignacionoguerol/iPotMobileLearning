angular.module('connection', ['ionic'])
    .run(function($ionicPlatform, $ionicPopup) {
        $ionicPlatform.ready(function() {
            if(window.Connection) {
                if(navigator.connection.type == Connection.NONE) {
                    $ionicPopup.confirm({
                        title: "Internet Disconnected",
                        content: "The internet is disconnected on your device."
                    })
                    .then(function(result) {
                        if(!result) {
                            //ionic.Platform.exitApp();
                            //avigator.app.exitApp();
                        }else{
                            //ionic.Platform.exitApp();
                            //navigator.app.exitApp();
                        }
                    });
                }
            }
        });
    });