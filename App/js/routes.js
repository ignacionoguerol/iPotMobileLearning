angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    

      .state('menu.home', {
    url: '/page1',
	params: {
		user: ""		
},
    views: {
      'side-menu21': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('menu.ranking', {
    url: '/page2',
    views: {
      'side-menu21': {
        templateUrl: 'templates/ranking.html',
        controller: 'rankingCtrl'
      }
    }
  })

  .state('menu.help', {
    url: '/page3',
    views: {
      'side-menu21': {
        templateUrl: 'templates/help.html',
        controller: 'helpCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('login', {
    url: '/page4',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('hieroglyphic', {
    url: '/page11',
	params: {
		temaSeleccionado: "",
		modalidadSeleccionada: "",
		aleatorio: "",
		por: "",
		contador: "",
		puntos: ""		
},
    templateUrl: 'templates/hieroglyphic.html',
    controller: 'hieroglyphicCtrl'
  })

  .state('hangman', {
    url: '/page10',
	params: {
		temaSeleccionado: "",
		modalidadSeleccionada: "",
		aleatorio: "",
		por: "",
		contador: "",
		puntos: ""		
},
    templateUrl: 'templates/hangman.html',
    controller: 'hangmanCtrl'
  })

  .state('questions', {
    url: '/page7',
	params: {
		temaSeleccionado: "",
		modalidadSeleccionada: "",
		aleatorio: "",
		por: "",
		contador: "",
		puntos: "",
		usuarios: ""		
},
    templateUrl: 'templates/questions.html',
    controller: 'questionsCtrl'
  })

  .state('puzzle', {
    url: '/page12',
	params: {
		temaSeleccionado: "",
		modalidadSeleccionada: "",
		aleatorio: "",
		por: "",
		contador: "",
		puntos: ""		
},
    templateUrl: 'templates/puzzle.html',
    controller: 'puzzleCtrl'
  })

  .state('couples', {
    url: '/page13',
	params: {
		temaSeleccionado: "",
		modalidadSeleccionada: "",
		aleatorio: "",
		por: "",
		contador: "",
		puntos: ""		
},
    templateUrl: 'templates/couples.html',
    controller: 'couplesCtrl'
  })

  .state('alphabethSoup', {
    url: '/page9',
	params: {
		temaSeleccionado: "",
		modalidadSeleccionada: "",
		aleatorio: "",
		por: "",
		contador: "",
		puntos: ""		
},
    templateUrl: 'templates/alphabethSoup.html',
    controller: 'alphabethSoupCtrl'
  })

$urlRouterProvider.otherwise('/page4')


});