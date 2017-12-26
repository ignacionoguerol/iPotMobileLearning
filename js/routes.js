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

  .state('menu.profile', {
    url: '/page3',
    views: {
      'side-menu21': {
        templateUrl: 'templates/profile.html',
        controller: 'profileCtrl'
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

  .state('video', {
    url: '/juego',
	params: {
		temaSeleccionado: "",
		modalidadSeleccionada: "",
		aleatorio: "",
		por: "",
		contador: ""		
},
    templateUrl: 'templates/video.html',
    controller: 'videoCtrl'
  })

  .state('imagen', {
    url: '/page8',
	params: {
		temaSeleccionado: "",
		modalidadSeleccionada: "",
		aleatorio: "",
		por: "",
		contador: ""		
},
    templateUrl: 'templates/imagen.html',
    controller: 'imagenCtrl'
  })

  .state('jeroglifico', {
    url: '/page11',
	params: {
		temaSeleccionado: "",
		modalidadSeleccionada: "",
		aleatorio: "",
		por: "",
		contador: "",
		puntos: ""		
},
    templateUrl: 'templates/jeroglifico.html',
    controller: 'jeroglificoCtrl'
  })

  .state('ahorcado', {
    url: '/page10',
	params: {
		temaSeleccionado: "",
		modalidadSeleccionada: "",
		aleatorio: "",
		por: "",
		contador: "",
		puntos: ""		
},
    templateUrl: 'templates/ahorcado.html',
    controller: 'ahorcadoCtrl'
  })

  .state('preguntas', {
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
    templateUrl: 'templates/preguntas.html',
    controller: 'preguntasCtrl'
  })

  .state('puzzle', {
    url: '/page12',
	params: {
		temaSeleccionado: "",
		modalidadSeleccionada: "",
		aleatorio: "",
		por: "",
		contador: ""		
},
    templateUrl: 'templates/puzzle.html',
    controller: 'puzzleCtrl'
  })

  .state('parejas', {
    url: '/page13',
	params: {
		temaSeleccionado: "",
		modalidadSeleccionada: "",
		aleatorio: "",
		por: "",
		contador: ""		
},
    templateUrl: 'templates/parejas.html',
    controller: 'parejasCtrl'
  })

  .state('sopaDeLetras', {
    url: '/page9',
	params: {
		temaSeleccionado: "",
		modalidadSeleccionada: "",
		aleatorio: "",
		por: "",
		contador: ""		
},
    templateUrl: 'templates/sopaDeLetras.html',
    controller: 'sopaDeLetrasCtrl'
  })

$urlRouterProvider.otherwise('/page4')


});