angular.module('app.config', [])
// remember to add "app.config" to your angular modules in Code Settings

.config(function(BackandProvider) {
 
 BackandProvider.setAppName('ipot2');
 BackandProvider.setSignUpToken('59fba5da-2aaa-4264-99ba-ce8ed749d796');
 BackandProvider.setAnonymousToken('0a081ab5-bd89-4bd5-b8e2-70c71224353a');
 
});