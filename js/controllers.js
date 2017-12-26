angular.module('app.controllers', [])
  
.controller('homeCtrl', ['$scope', '$stateParams', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state) {
    
    
    $scope.tema = {
        temaSeleccionado:'',
        por: 'Unit',
        contador:1
    }
    
    $scope.modalidad = {
        modalidadSeleccionada:'',
        por: 'Mode',
        contador:1
    }
    
    $scope.aleatorio = {
        aleatorio:'',
        por: '',
        contador:1
    }
    
    $scope.temas = [
        { 'id':'Unit 1', 'label':'Unit 1'},
        { 'id':'Unit 2', 'label':'Unit 2'}
    ];
    
    $scope.modalidades = [
        { 'id':'preguntas', 'label':'Questions'},
        //{ 'id':'video', 'label':'Video'},
        //{ 'id':'imagen', 'label':'Images'},
        { 'id':'sopaDeLetras', 'label':'Sopa de Letras'},
        { 'id':'ahorcado', 'label':'Ahorcado'},
        { 'id':'jeroglifico', 'label':'Jeroglífico'},
        { 'id':'puzzle', 'label':'Puzzle'}
        //{ 'id':'parejas', 'label':'Parejas'}
        
    ];
    
    //funcion de cada boton
    
    $scope.juegoTema = function(){
        $state.go('ahorcado', $scope.tema);
    };
    
    $scope.juegoModalidad = function(id){
        $state.go(id, $scope.modalidad);
    };
    
    $scope.juegoAleatorio = function(){
        $scope.aleatorio = {
        aleatorio:'Any',
        por: 'Random',
        contador:1
        }
        $state.go('sopaDeLetras2', $scope.aleatorio);
    };
    
    
    }])
   
.controller('rankingCtrl', ['$scope', '$stateParams', '$firebaseArray', '$ionicUser', 'dbarray', '$timeout', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $firebaseArray, $ionicUser, dbarray, $timeout) {
    
     var init = dbarray.init("usuarios");
     $scope.usuarios = dbarray.loadArrayUsuarios("usuarios");
     
     $scope.usuariosFisio = [];
     $scope.usuariosTerapia = [];
     
    if (init === 0){
        waitTime = 2000;
    }else if (init === 1){
        waitTime = 0;
    }
    
    $scope.show = false;
     
     $timeout(function() {
     angular.forEach($scope.usuarios, function(usuario){
         if(usuario.Grado === 1){
             $scope.usuariosFisio.push(usuario);
         }else{
             $scope.usuariosTerapia.push(usuario);
         }
     });
     
     $scope.show = true;
     }, waitTime);
}])
   
.controller('profileCtrl', ['$scope', '$stateParams', '$ionicPopup', 'dbarray', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicPopup, dbarray) {
    
    $scope.nick = "";
    
    //Get user data
     firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            $scope.email = user.email;
            $scope.nombre  = user.Nombre;
        }else{
            $scope.email = anonimo;
        }
    })
    
    $scope.changeNick = function(nick){
        dbarray.changeNick($scope.email, nick);
    }

    $scope.resetPassword = function(){
        
        if ($scope.mail !== null) {
            firebase.auth().sendPasswordResetEmail($scope.email);
            $ionicPopup.alert({
                title: 'Se ha enviado un email a  ' + $scope.email + '.'
            });
        }else{
            $ionicPopup.alert({
                title: 'No ha sido posible enviar la solicitud'
            })  
        }
    }

}])
   
.controller('menuCtrl', ['$scope', '$stateParams', '$state', '$firebaseObject', 'dbarray', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $firebaseObject, dbarray) {
    
    //Fibebase object necesario? 
    
    
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            $scope.email = user.email;
        }else{
            $scope.email = anonimo;
        }
    })
    
    $scope.logout = function(){
        firebase.auth().signOut();
        $state.go('login');
    };
    
}
    

])
   
.controller('loginCtrl', ['$scope', '$stateParams', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state) {

    $scope.data = {
        'email': '',
        'password': ''
    };
    
    $scope.error = '';
    
    firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        $scope.user=user;
        $state.go('menu.home');
    }
    });
    
    $scope.login = function(){
        const promise = firebase.auth().signInWithEmailAndPassword($scope.data.email,  $scope.data.password);
        promise.then(resp => {
            $state.go('menu.home');
        }).catch(err => {
            $scope.$apply(function(){     
            $scope.error = err.message;
            });
        })
    }

}])
   
.controller('videoCtrl', ['$scope', '$stateParams', '$state', '$timeout', 'video', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $timeout, video){

     //Comprobacion de parametros
    
    if($stateParams.temaSeleccionado !== ''){
        $scope.tipo = $stateParams.temaSeleccionado;
    }else if ($stateParams.modalidadSeleccionada !==''){
         $scope.tipo =$stateParams.modalidadSeleccionada;
    }else if ($stateParams.aleatorio !== ''){
        $scope.tipo = $stateParams.aleatorio;
    }
    
    $scope.contador = $stateParams.contador;
    $scope.modo = $stateParams.por;
    
    //Inicializar objecto pregunta
    video.init('After a while, practitioners were called therapeutic masseurs');
    
    //variables scope
    
    $scope.objeto = {
        pregunta : video.getPregunta(),
        respuestas: video.getRespuestas(),
        selected:'',
        correcta: video.getCorrecta(),
        url: video.getUrl()
    };
    
    $scope.resultado = '';

    
    //Parametros a enviar 
     $scope.modeParams = {
        modalidadSeleccionada:'Video',
        por: $scope.modo,
        contador: $scope.contador+1
    };
    
    $scope.unitParams = {
        modalidadSeleccionada:'Preguntas',
        por: $scope.modo,
        contador: $scope.contador+1
    };
    
    
    
    //funciones
    
    $scope.siguiente = function(){
            $scope.stopTimer();
        if($scope.modo === 'Mode'){
            $state.go('video', $scope.modeParams);
        }else{
            $state.go('ahorcado',  $scope.unitParams);
        }
    }
    
    $scope.exit = function(){
         $state.go('menu.home');
     } 
     
     $scope.comprobar = function(){
        $scope.stopTimer();
        
         if ($scope.objeto.selected === $scope.objeto.correcta){
             $scope.resultado = 'Correct!';
         }else{
             $scope.resultado = 'Fail';
         }
            
    };
      
      
      /////////////////////////////////////////////////////////  
      /////////////////////////////////////////////////////////  
    
    $scope.counter = 30;
    
    $scope.onTimeout = function() {
        if($scope.counter ===  0) {
            $timeout.cancel(mytimeout);
            if($scope.contador<10){
                $scope.siguiente();
            }else{
                $scope.exit();
            }
            return;
        }
        $scope.counter--;
        mytimeout = $timeout($scope.onTimeout, 1000);
    };
    $scope.startTimer = function() {
        mytimeout = $timeout($scope.onTimeout, 1000);
    };
    // stops and resets the current timer
    $scope.stopTimer = function() {
        $timeout.cancel(mytimeout);
    };
    
    /////////////////////////////////////////////////////////  
      ///////////////////////////////////////////////////////// 
        
       
        
}




])
   
.controller('imagenCtrl', ['$scope', '$stateParams', '$state', '$timeout', 'imagen', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $timeout, imagen){
    

     //Comprobacion de parametros
    
    if($stateParams.temaSeleccionado !== ''){
        $scope.tipo = $stateParams.temaSeleccionado;
    }else if ($stateParams.modalidadSeleccionada !==''){
         $scope.tipo =$stateParams.modalidadSeleccionada;
    }else if ($stateParams.aleatorio !== ''){
        $scope.tipo = $stateParams.aleatorio;
    }
    
    $scope.contador = $stateParams.contador;
    $scope.modo = $stateParams.por;
    
    //Inicializar objecto pregunta
    imagen.init('The next step after the practitioner was the diploma in physiotherapy.');
    
    //variables scope
    
    $scope.objeto = {
        pregunta : imagen.getPregunta(),
        respuestas: imagen.getRespuestas(),
        selected:'',
        correcta: imagen.getCorrecta(),
        url: imagen.getUrl()
    };
    
    $scope.resultado = '';

    
    //Parametros a enviar 
     $scope.modeParams = {
        modalidadSeleccionada:'Video',
        por: $scope.modo,
        contador: $scope.contador+1
    };
    
    $scope.unitParams = {
        modalidadSeleccionada:'Preguntas',
        por: $scope.modo,
        contador: $scope.contador+1
    };
    
    
    
    //funciones
    
    $scope.siguiente = function(){
            $scope.stopTimer();
        if($scope.modo === 'Mode'){
            $state.go('imagen', $scope.modeParams);
        }else{
            $state.go('video',  $scope.unitParams);
        }
    }
    
    $scope.exit = function(){
         $state.go('menu.home');
     } 
     
     $scope.comprobar = function(){
        $scope.stopTimer();
        
         if ($scope.objeto.selected === $scope.objeto.correcta){
             $scope.resultado = 'Correct!';
         }else{
             $scope.resultado = 'Fail';
         }
            
    };
      
      
      /////////////////////////////////////////////////////////  
      /////////////////////////////////////////////////////////  
    
    $scope.counter = 30;
    
    $scope.onTimeout = function() {
        if($scope.counter ===  0) {
            $timeout.cancel(mytimeout);
            if($scope.contador<10){
                $scope.siguiente();
            }else{
                $scope.exit();
            }
            return;
        }
        $scope.counter--;
        mytimeout = $timeout($scope.onTimeout, 1000);
    };
    $scope.startTimer = function() {
        mytimeout = $timeout($scope.onTimeout, 1000);
    };
    // stops and resets the current timer
    $scope.stopTimer = function() {
        $timeout.cancel(mytimeout);
    };
    
    /////////////////////////////////////////////////////////  
      ///////////////////////////////////////////////////////// 
        
       
        
}




])
   
.controller('jeroglificoCtrl', ['$scope', '$stateParams', '$state', '$timeout', 'dbarray', 'jeroglifico', '$ionicPlatform', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $timeout, dbarray, jeroglifico, $ionicPlatform){

    // Disable BACK button on home
    $ionicPlatform.registerBackButtonAction(function (event) {
        event.preventDefault();
    }, 100);
   
    
     //Comprobacion de parametros
     if($stateParams.temaSeleccionado !== ''){
        $scope.tipo = $stateParams.temaSeleccionado;
    }else if ($stateParams.modalidadSeleccionada !==''){
         $scope.tipo =$stateParams.modalidadSeleccionada;
    }else if ($stateParams.aleatorio !== ''){
        $scope.tipo = $stateParams.aleatorio;
    }
    
    $scope.contador = $stateParams.contador;
    $scope.modo = $stateParams.por;
    
    //variables scope
    $scope.objeto = {
        pista : '',
        respuestas: '',
        inputText: '',
        url: ''
    };
    
    //$scope.resultado = '';
    $scope.resuelto = false;
    
    
    //Iniciar base de datos FIREBASE
    var init = dbarray.init("JeroglificoFisioterapia");
    $scope.preguntas = dbarray.loadArray("JeroglificoFisioterapia");
    
    var waitTime = 0;
    if (init === 0){
        waitTime = 2000;
    }else if (init === 1){
        waitTime = 0;
    }
    
    //Get user data
     firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            $scope.email = user.email;
        }else{
            $scope.email = anonimo;
        }
    });
    
    $scope.show = true; // controlla la visibilidad de la plantilla y el loading.
    
    $timeout(function() {
       
        var random = Math.floor(Math.random() * ($scope.preguntas.length));
        
        jeroglifico.init($scope.preguntas[random]);
        console.log(jeroglifico.getRespuesta())
        //Variables propias de cada pregunta
        $scope.objeto = {
            pista : jeroglifico.getPista(),
            respuesta: jeroglifico.getRespuesta(),
            url: jeroglifico.getUrl(),
            inputText: ''
        };
        
        $scope.show = false;
        $scope.startTimer();
        $scope.resultado = '';
    
    }, waitTime);
    
    $scope.puntos = 0;
    
    if($stateParams.puntos !== ''){
        $scope.puntos = $stateParams.puntos;
    }
    console.log($scope.puntos);
    
    
    $scope.loadParams = function(){
    //Parametros a enviar 
     $scope.modeParams = {
        modalidadSeleccionada:'Video',
        por: $scope.modo,
        contador: $scope.contador+1,
        puntos: $scope.puntos
    };
    
    $scope.unitParams = {
        modalidadSeleccionada:'Preguntas',
        por: $scope.modo,
        contador: $scope.contador+1,
        puntos: $scope.puntos
    };
    
    }
    
    //funciones
    
    $scope.siguiente = function(){
        
        $scope.loadParams();   
        //if($scope.modo === 'Mode'){
        $state.go('jeroglifico', $scope.modeParams);
        //}else{
            //$state.go('preguntas',  $scope.unitParams);
        //}
    }
    
    $scope.exit = function(){
         dbarray.savePoints($scope.puntos, $scope.email);
         $state.go('menu.home');
     } 
     
    $scope.comprobar = function(){
        $scope.stopTimer();
        $scope.resuelto = true;
        
         if ($scope.objeto.inputText === $scope.objeto.respuesta){
             //$scope.resultado = 'Correct!';
             document.getElementById("input").style.backgroundColor = '#33CD5F';
             document.getElementById("input-in").style.backgroundColor = '#33CD5F';
             $scope.puntos++;
             dbarray.submitJugada(jeroglifico.getRespuesta(), 1, $scope.email, 3);
         }else{
             //$scope.resultado = 'Fail';
             document.getElementById("input").style.backgroundColor = '#EF473A';
             document.getElementById("input-in").style.backgroundColor = '#EF473A';
             dbarray.submitJugada(jeroglifico.getRespuesta(), 0, $scope.email, 3);
         }
            
    };
      
      
      /////////////////////////////////////////////////////////  
      /////////////////////////////////////////////////////////  
    
    $scope.counter = 60;
    
    $scope.onTimeout = function() {
        if($scope.counter ===  0) {
            $timeout.cancel(mytimeout);
            // Apunta error si se acaba el tiempo
            dbarray.submitJugada(pregunta.getId(), 0, $scope.email, 1);
            if($scope.contador<10){
                $scope.siguiente();
            }else{
                $scope.exit();
            }
            return;
        }
        
        $scope.counter-=1;
        mytimeout = $timeout($scope.onTimeout, 1000);
    };
    $scope.startTimer = function() {
        mytimeout = $timeout($scope.onTimeout, 1000);
    };
    // stops and resets the current timer
    $scope.stopTimer = function() {
        $timeout.cancel(mytimeout);
    };
    
    /////////////////////////////////////////////////////////  
      ///////////////////////////////////////////////////////// 
        
       
        
}





])
   
.controller('ahorcadoCtrl', ['$scope', '$stateParams', '$state', '$timeout', 'dbarray', 'ahorcado', '$ionicPlatform', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $timeout, dbarray, ahorcado, $ionicPlatform){

    // Disable BACK button on home
    $ionicPlatform.registerBackButtonAction(function (event) {
        event.preventDefault();
    }, 100);
     
    
     //Comprobacion de parametros
    
    if($stateParams.temaSeleccionado !== ''){
        $scope.tipo = $stateParams.temaSeleccionado;
    }else if ($stateParams.modalidadSeleccionada !==''){
         $scope.tipo =$stateParams.modalidadSeleccionada;
    }else if ($stateParams.aleatorio !== ''){
        $scope.tipo = $stateParams.aleatorio;
    }
    
    $scope.contador = $stateParams.contador;
    $scope.modo = $stateParams.por;
    
    $scope.fotoAhorcado = {
        0: "https://firebasestorage.googleapis.com/v0/b/ipot-mobile-learning.appspot.com/o/1.gif?alt=media&token=2624db2a-c8b4-4478-805f-e031cdeea656",
        1: "https://firebasestorage.googleapis.com/v0/b/ipot-mobile-learning.appspot.com/o/2.gif?alt=media&token=ae744050-7584-4fe2-8c1f-7c3c8191aa98",
        2: "https://firebasestorage.googleapis.com/v0/b/ipot-mobile-learning.appspot.com/o/3.gif?alt=media&token=a16b32fb-da1b-4275-b1ed-4f11598406c2",
        3: "https://firebasestorage.googleapis.com/v0/b/ipot-mobile-learning.appspot.com/o/4.gif?alt=media&token=62ddd6dc-aa5d-445b-b192-094830622e10",
        4: "https://firebasestorage.googleapis.com/v0/b/ipot-mobile-learning.appspot.com/o/5.gif?alt=media&token=c9365881-0a9f-4658-9bb0-9c87b6da9e64",
        5: "https://firebasestorage.googleapis.com/v0/b/ipot-mobile-learning.appspot.com/o/6.gif?alt=media&token=0109743c-7f53-4d81-8389-672dd46ccece"
    }
    
    //variables scope
    $scope.letraSeleccionada = '';
    $scope.letrasFalladas = '';
    $scope.letrasAcertadas = '';
    $scope.fallos = 0;
    $scope.intentos = 5;
    $scope.aciertos = 0;
    
     //Iniciar base de datos FIREBASE
    var init = dbarray.init("AhorcadoFisioterapia");
    $scope.preguntas = dbarray.loadArray("AhorcadoFisioterapia");

    //Get user data
     firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            $scope.email = user.email;
        }else{
            $scope.email = anonimo;
        }
    })
    
    var waitTime;
    
    if (init === 0){
        waitTime = 2000;
    }else if (init === 1){
        waitTime = 1000;
    }
    
    // controlla la visibilidad de la plantilla y el loading.
    $scope.show = true; 
    
    $timeout(function() {
        var random = Math.floor(Math.random() * ($scope.preguntas.length));
       
        ahorcado.init($scope.preguntas[random]);
        
        //Variables propias de cada pregunta
        $scope.objeto = {
            pista : ahorcado.getPista(),
            palabra: ahorcado.getPalabra(),
            url: ''
        };
        
        $scope.generarVectorAhorcado();
        $scope.show = false;
        $scope.startTimer();
        $scope.resultado = '';
        

    }, waitTime);
    
    
    
     $scope.puntos = 0;
    if($stateParams.puntos !== ''){
        $scope.puntos = $stateParams.puntos;
    }
    
    //funciones
    $scope.loadParams = function(){
    //Parametros a enviar 
     $scope.modeParams = {
        modalidadSeleccionada:'Video',
        por: $scope.modo,
        contador: $scope.contador+1,
        puntos: $scope.puntos
    };
    
    $scope.unitParams = {
        modalidadSeleccionada:'Preguntas',
        por: $scope.modo,
        contador: $scope.contador+1,
        puntos: $scope.puntos
    };
    }
    
    
    
    $scope.siguiente = function(){
        $scope.stopTimer();
        
        if($scope.intentos !== $scope.fallos && $scope.counter > 0){
            $scope.puntos++;
            dbarray.submitJugada(ahorcado.getPalabra(), 1, $scope.email, 2);
        }else{
            dbarray.submitJugada(ahorcado.getPalabra(), 0, $scope.email, 2);
        }
        
        $scope.loadParams();       
        
        //if($scope.modo === 'Mode'){
            $state.go('ahorcado', $scope.modeParams);
        //}else{
           // $state.go('jeroglifico',  $scope.unitParams);
        //}
    };
    
    $scope.exit = function(){
        $scope.stopTimer();
        if($scope.intentos !== $scope.fallos){
            $scope.puntos++;
            dbarray.submitJugada(ahorcado.getPalabra(), 1, $scope.email, 2);
        }else{
            dbarray.submitJugada(ahorcado.getPalabra(), 0, $scope.email, 2);
        }
         dbarray.savePoints($scope.puntos, $scope.email);
         $state.go('menu.home');
     };
     
    $scope.comprobar = function(letra){
         
        this.letraSeleccionada = '';
         
        var encontrada = false;
        var repetida = false;
        var repetidaF = false;
        
        
        for(var c = 0; c < $scope.letrasAcertadas.length; c++){
            
                if($scope.letrasAcertadas[c] === letra.toUpperCase()){
                    repetida = true;
                }
        }
                
         
        for (var i = 0, len = $scope.objeto.palabra.length; i < len; i++) {
            
            L = $scope.objeto.palabra[i].toUpperCase(); //mayúscula
            l = $scope.objeto.palabra[i].toLowerCase(); //minúscula

            if((l === letra.toLowerCase() || L === letra.toUpperCase()) & !encontrada & !repetida){
                
                $scope.elements = document.getElementsByClassName("letra-"+L);
                for (var e = 0; e < $scope.elements.length; e++){
                    $scope.elements[e].style.color = 'black';
                    $scope.aciertos++;
                    if($scope.aciertos == $scope.objeto.palabra.length){
                        $scope.stopTimer();
                    }
                }
                $scope.letraSeleccionada = null;
                encontrada = true;
                $scope.letrasAcertadas += L;
                return;
            }
            
        }
        
        for(var cc = 0; cc < $scope.letrasFalladas.length; cc++){
            
                if($scope.letrasFalladas[cc] === letra.toUpperCase()){
                    repetidaF = true;
                }
        }
        
        if(!encontrada && !repetida && !repetidaF){
            $scope.fallos++;
            if($scope.fallos == $scope.intentos){
                $scope.stopTimer();
            }
            $scope.letrasFalladas += letra.toUpperCase();
        }
        
        
    };
            
    $scope.generarVectorAhorcado = function(){
    
        document.getElementById("tabla-ahorcado").innerHTML += "";
    
        for (var i = 0, len = $scope.objeto.palabra.length; i < len; i++) {
            document.getElementById("tabla-ahorcado").innerHTML += '<td style=\'color: white\' class="vectorAhorcado letra-'      
            + $scope.objeto.palabra[i].toUpperCase() + '">' + $scope.objeto.palabra[i] + '</td>';
        
            }
    };
      
      
      /////////////////////////////////////////////////////////  
      /////////////////////////////////////////////////////////  
    
    $scope.counter = 60;
    
    $scope.onTimeout = function() {
        if($scope.counter ===  0) {
            $timeout.cancel(mytimeout);
            // Apunta error si se acaba el tiempo
            dbarray.submitJugada(pregunta.getId(), 0, $scope.email, 1);
            if($scope.contador<10){
                $scope.siguiente();
            }else{
                $scope.exit();
            }
            return;
        }
        $scope.counter--;
        mytimeout = $timeout($scope.onTimeout, 1000);
    };
    $scope.startTimer = function() {
        mytimeout = $timeout($scope.onTimeout, 1000);
    };
    // stops and resets the current timer
    $scope.stopTimer = function() {
        $timeout.cancel(mytimeout);
    };
    
    /////////////////////////////////////////////////////////  
      ///////////////////////////////////////////////////////// 
        
       
        
}




])
   
.controller('preguntasCtrl', ['$scope', '$stateParams', '$state', '$timeout', '$firebaseArray', 'pregunta', 'dbarray', '$q', '$ionicPlatform', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $timeout, $firebaseArray, pregunta, dbarray, $q, $ionicPlatform) {
    
    // Disable BACK button on home
    $ionicPlatform.registerBackButtonAction(function (event) {
        event.preventDefault();
    }, 100);
     
    //Se comprueba el tema o la modalidad especifica que se ha elegido.
    if($stateParams.temaSeleccionado !== ''){
        $scope.tipo = $stateParams.temaSeleccionado;
    }else if ($stateParams.modalidadSeleccionada !==''){
         $scope.tipo =$stateParams.modalidadSeleccionada;
    }else if ($stateParams.aleatorio !== ''){
        $scope.tipo = $stateParams.aleatorio;
    }
  
    
    //Parametro que guarda el modo desde el que se ha iniciado el juego.
    $scope.modo = $stateParams.por;
    
    //Contador de ejercicios completados.
    $scope.contador = $stateParams.contador;
    
    $scope.preguntas = [];
    
    
    //Iniciar base de datos FIREBASE
    var init = dbarray.init("PreguntasFisioterapia");
    $scope.preguntas = dbarray.loadArray("PreguntasFisioterapia");
    
    var waitTime;
    
    if (init === 0){
        waitTime = 2000;
    }else if (init === 1){
        waitTime = 0;
    }
    
    //Get user data
     firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            $scope.email = user.email;
        }else{
            $scope.email = anonimo;
        }
    })
    
    $scope.show = true; // controlla la visibilidad de la plantilla y el loading.
    
    $timeout(function() {
        $scope.show = false;
        var random = Math.floor(Math.random() * ($scope.preguntas.length));
        
        pregunta.init($scope.preguntas[random]);
    
        //Variables propias de cada pregunta
        $scope.objeto = {
            pregunta : pregunta.getPregunta(),
            respuestas: pregunta.getRespuestas(),
            selected:'',
            correcta: pregunta.getCorrecta()
        };
        
        $scope.startTimer();
        
        $scope.resultado = '';
        

    }, waitTime);
    
    $scope.puntos = 0;
    if($stateParams.puntos !== ''){
        $scope.puntos = $stateParams.puntos;
    }
    
    //Funciones
    
    $scope.loadParams = function(){
        //Parametros a enviar 
    $scope.modeParams = {
        modalidadSeleccionada:'Preguntas',
        por: $scope.modo,
        contador: $scope.contador+1,
        puntos: $scope.puntos
    };
    $scope.unitParams = {
        modalidadSeleccionada:'Video',
        por: $scope.modo,
        contador: $scope.contador+1,
        puntos: $scope.puntos
    };
    
    }
        
    $scope.siguiente = function(){
        $scope.stopTimer();
        $scope.loadParams();
        //if($scope.modo === 'Mode'){
        $state.go('preguntas', $scope.modeParams);
        //}else{
         //   $state.go('imagen', $scope.unitParams);
        //}
    };
    
    
    
    $scope.exit = function(){
        dbarray.savePoints($scope.puntos, $scope.email);
         $state.go('menu.home');
        };  
        
    $scope.comprobar = function(p, id){
        $scope.objeto.selected = p;
        $scope.stopTimer();
        
         if ($scope.objeto.selected === $scope.objeto.correcta){
             //$scope.resultado = 'Correcto!';
             document.getElementById(id).style.backgroundColor = '#33CD5F';
             $scope.puntos++;
             //dbarray.submitJugada(pregunta.getId(), 1, $ionicUser.details.email, 1);
             dbarray.submitJugada(pregunta.getPregunta(), 1, $scope.email, 1);
         }else{
             //$scope.resultado = 'Has fallado!';
            document.getElementById(id).style.backgroundColor = '#EF473A';             
            //dbarray.submitJugada(pregunta.getId(), 0, $ionicUser.details.email, 1);
             dbarray.submitJugada(pregunta.getPregunta(), 0, $scope.email, 1);
         }
            
        
    };
    
    /////////////////////////////////////////////////////////  
    /////////////////////////Temporizador/////////////////////// 
      
      $scope.counter = 60;
    
    $scope.onTimeout = function() {
        if($scope.counter ===  0) {
            $scope.stopTimer();
            // Apunta error si se acaba el tiempo
            dbarray.submitJugada(pregunta.getId(), 0, $scope.email, 1); 
            if($scope.contador<10){
            $scope.siguiente();
            }else{
                $scope.exit();
            }
            return;
        }
        $scope.counter--;
        mytimeout = $timeout($scope.onTimeout, 1000);
    };
    $scope.startTimer = function() {
        mytimeout = $timeout($scope.onTimeout, 1000);
    };
    // stops and resets the current timer
    $scope.stopTimer = function() {
        $timeout.cancel(mytimeout);
    };
    
    /////////////////////////////////////////////////////////  
    ///////////////////////////////////////////////////////// 
        
    
        
}])
   
.controller('puzzleCtrl', ['$scope', '$stateParams', '$state', '$timeout', 'puzzle', 'dbarray', '$ionicPlatform', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $timeout, puzzle, dbarray, $ionicPlatform) {
    
    // Disable BACK button on home
    $ionicPlatform.registerBackButtonAction(function (event) {
        event.preventDefault();
    }, 100);
    
    //Se comprueba el tema o la modalidad especifica que se ha elegido.
    if($stateParams.temaSeleccionado !== ''){
        $scope.tipo = $stateParams.temaSeleccionado;
    }else if ($stateParams.modalidadSeleccionada !==''){
         $scope.tipo =$stateParams.modalidadSeleccionada;
    }else if ($stateParams.aleatorio !== ''){
        $scope.tipo = $stateParams.aleatorio;
    }
  
    //Parametro que guarda el modo desde el que se ha iniciado el juego.
    $scope.modo = $stateParams.por;
    
    //Contador de ejercicios completados.
    $scope.contador = $stateParams.contador;
    
    //Iniciar base de datos FIREBASE
    var init = dbarray.init("PuzzlesFisioterapia");
    $scope.preguntas = dbarray.loadArray("PuzzlesFisioterapia");
    
    var waitTime;
    
    if (init === 0){
        waitTime = 2000;
    }else if (init === 1){
        waitTime = 0;
    }
    
    //Get user data
     firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            $scope.email = user.email;
        }else{
            $scope.email = anonimo;
        }
    })
    
    $scope.show = true; // controlla la visibilidad de la plantilla y el loading.
    
    $timeout(function() {
        
        $scope.show = false;
        var random = Math.floor(Math.random() * ($scope.preguntas.length));
        
        puzzle.init($scope.preguntas[random]);
    
        //Variables propias de cada pregunta
       $scope.objeto = {
        tema : puzzle.getTema(),
        
        /*desordenadas: [
            {'id': 'Practitioner', 'orden': 3},
            {'id': 'Medical Technician Assistant', 'orden':1},
            {'id': 'Physical Therapy', 'orden':2}
        ]*/
        
        desordenadas : puzzle.getPalabras(),
        
        ordenadas: [
            {'id': ' '},
            {'id': ' '},
            {'id': ' '},
            {'id': ' '}
        ]
        
    };
        
        $scope.startTimer();
        
        $scope.resultado = '';
        

    }, waitTime);
    
    $scope.puntos = 0;
    if($stateParams.puntos !== ''){
        $scope.puntos = $stateParams.puntos;
    }

    
    //Variables propias de cada pregunta
    
    
    $scope.resultado = '';
    
    
    $scope.loadParams = function(){    
        //Parametros a enviar 
        $scope.modeParams = {
            modalidadSeleccionada:'Preguntas',
            por: $scope.modo,
            contador: $scope.contador+1,
            puntos: $scope.puntos
        };
        $scope.unitParams = {
            modalidadSeleccionada:'Video',
            por: $scope.modo,
            contador: $scope.contador+1,
            puntos: $scope.puntos
        };
    
    }
    
    $scope.orden = 0;
    
    //Funciones
        
    $scope.siguiente = function(){
        $scope.stopTimer();
        //if($scope.modo === 'Mode'){
        $scope.loadParams();
        $state.go('puzzle', $scope.modeParams);
        //}else{
          //  $state.go('ahorcado', $scope.unitParams);
        //}
    };
    
    $scope.exit = function(){
        $scope.stopTimer();
        dbarray.savePoints($scope.puntos, $scope.email);
        $state.go('menu.home');
    };  
        
    $scope.comprobar = function(palabra){
        
        $scope.objeto.ordenadas[$scope.orden].id = palabra;
        $scope.orden++;
        
        if($scope.orden >= $scope.objeto.desordenadas.length){
               
            for (var i in $scope.objeto.desordenadas){
                for (var e in $scope.objeto.ordenadas){
                    if($scope.objeto.desordenadas[i].id === $scope.objeto.ordenadas[e].id ){
                        if($scope.objeto.desordenadas[i].orden !== ++e){
                            e--;
                            $scope.resultado = 'Has fallado!';
                            dbarray.submitJugada($scope.objeto.tema, 0, $scope.email, 4);
                            return;
                        }else{
                             e--;
                        }
                    }
                }
            }
            
            $scope.resultado = 'Correcto!';
            dbarray.submitJugada($scope.objeto.tema, 1, $scope.email, 4);
            $scope.puntos++;
            
        }
       
    };
    
    /////////////////////////////////////////////////////////  
    /////////////////////////Temporizador/////////////////////// 
      
      $scope.counter = 60;
    
    $scope.onTimeout = function() {
        if($scope.counter ===  0) {
            $scope.stopTimer();
            // Apunta error si se acaba el tiempo
            dbarray.submitJugada(pregunta.getId(), 0, $scope.email, 1);
            if($scope.contador<10){
                $scope.siguiente();
            }else{
                $scope.exit();
            }
            return;
        }
        $scope.counter--;
        mytimeout = $timeout($scope.onTimeout, 1000);
    };
    $scope.startTimer = function() {
        mytimeout = $timeout($scope.onTimeout, 1000);
    };
    // stops and resets the current timer
    $scope.stopTimer = function() {
        $timeout.cancel(mytimeout);
    };
    
    /////////////////////////////////////////////////////////  
    ///////////////////////////////////////////////////////// 
        
        
}])
   
.controller('parejasCtrl', ['$scope', '$stateParams', '$state', '$timeout', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $timeout) {
    
    //Se comprueba el tema o la modalidad especifica que se ha elegido.
    if($stateParams.temaSeleccionado !== ''){
        $scope.tipo = $stateParams.temaSeleccionado;
    }else if ($stateParams.modalidadSeleccionada !==''){
         $scope.tipo =$stateParams.modalidadSeleccionada;
    }else if ($stateParams.aleatorio !== ''){
        $scope.tipo = $stateParams.aleatorio;
    }
  
    //Parametro que guarda el modo desde el que se ha iniciado el juego.
    $scope.modo = $stateParams.por;
    
    //Contador de ejercicios completados.
    $scope.contador = $stateParams.contador;

    
    //Variables propias de cada pregunta
    $scope.objeto = {
        pista : 'Pista/Tema',
        placeholder: "",
        i: [
            {'url': 'Practitioner', 'orden': 3},
            {'url': 'Medical Technician Assistant', 'orden':1},
            {'url': 'Physical Therapy', 'orden':2}
        ],
        r: [
            {'url': 'Practitioner', 'orden': 3},
            {'url': 'Medical Technician Assistant', 'orden':1},
            {'url': 'Physical Therapy', 'orden':2}
        ]
        
    };
    
    $scope.resultado = '';
        
    //Parametros a enviar 
    $scope.modeParams = {
        modalidadSeleccionada:'Preguntas',
        por: $scope.modo,
        contador: $scope.contador+1
    };
    $scope.unitParams = {
        modalidadSeleccionada:'Video',
        por: $scope.modo,
        contador: $scope.contador+1
    };
    
    $scope.orden = 0;
    
    //Funciones
        
    $scope.siguiente = function(){
        $scope.stopTimer();
        if($scope.modo === 'Mode'){
            $state.go('parejas', $scope.modeParams);
        }else{
            $state.go('ahorcado', $scope.unitParams);
        }
    };
    
    $scope.exit = function(){
         $state.go('menu.home');
        };  
        
    $scope.click = 0;
    
    $scope.comprobar = function(id){
        
        var x = document.getElementById(id);
        if(x.style.background === "red"){
            x.style.background = "white";
        }else{
            x.style.background = "red";
        }
        

       if ($scope.click === 0){
           $scope.click = 1;
           
       }else if ($scope.click === 1){
           $scope.click = 0;
       }
            
       
    };
    
    /////////////////////////////////////////////////////////  
    /////////////////////////Temporizador/////////////////////// 
      
      $scope.counter = 30;
    
    $scope.onTimeout = function() {
        if($scope.counter ===  0) {
            $scope.stopTimer();
            if($scope.contador<10){
            //$scope.siguiente();
            }else{
                $scope.exit();
            }
            return;
        }
        $scope.counter--;
        mytimeout = $timeout($scope.onTimeout, 1000);
    };
    $scope.startTimer = function() {
        mytimeout = $timeout($scope.onTimeout, 1000);
    };
    // stops and resets the current timer
    $scope.stopTimer = function() {
        $timeout.cancel(mytimeout);
    };
    
    /////////////////////////////////////////////////////////  
    ///////////////////////////////////////////////////////// 
        
        
}])
   
.controller('sopaDeLetrasCtrl', ['$scope', '$stateParams', '$state', '$timeout', '$compile', 'sopa', '$firebaseArray', 'dbarray', '$ionicPlatform', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $timeout, $compile, sopa, $firebaseArray, dbarray, $ionicPlatform) {
    
    // Disable BACK button on home
    $ionicPlatform.registerBackButtonAction(function (event) {
        event.preventDefault();
    }, 100);
    
    //Se comprueba el tema o la modalidad especifica que se ha elegido.
    if($stateParams.temaSeleccionado !== ''){
        $scope.tipo = $stateParams.temaSeleccionado;
    }else if ($stateParams.modalidadSeleccionada !==''){
         $scope.tipo =$stateParams.modalidadSeleccionada;
    }else if ($stateParams.aleatorio !== ''){
        $scope.tipo = $stateParams.aleatorio;
    }
    
    //Parametro que guarda el modo desde el que se ha iniciado el juego.
    $scope.modo = $stateParams.por;
    
    //Contador de ejercicios completados.
    $scope.contador = $stateParams.contador;
    
    $scope.nPalabras = 0;
    
    //Iniciar base de datos FIREBASE
    var init = dbarray.init("SopaFisioterapia");
    $scope.preguntas = dbarray.loadArray("SopaFisioterapia");
    
    var waitTime;
    
    if (init === 0){
        waitTime = 2000;
    }else if (init === 1){
        waitTime = 0;
    }
    
    //Get user data
     firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            $scope.email = user.email;
        }else{
            $scope.email = anonimo;
        }
    })
    
    $scope.show = true; // controlla la visibilidad de la plantilla y el loading.
    
    $timeout(function() {
        
        $scope.show = false;
        var random = Math.floor(Math.random() * ($scope.preguntas.length));
        
        sopa.init($scope.preguntas[random]);
        
        //Variables propias de cada pregunta
        $scope.objeto = {
            pregunta : sopa.getPregunta(),
            palabras: sopa.getPalabras(),
            letras: sopa.getLetras()
        };
        
        $scope.startTimer();
        
        $scope.resultado = '';
        
        $scope.initSopa(); // Iniciarlizar sopa de letras

    }, waitTime);
    
    $scope.puntos = 0;
    if($stateParams.puntos !== ''){
        $scope.puntos = $stateParams.puntos;
    }
    
    $scope.initSopa = function(){
        $scope.palabras = 0;
        $scope.matrix = [];
        var row = [];
        var l = $scope.objeto.letras; 
        
        for (var i in l){
            if(l[i] !== "." && l[i] !== ","){
                row.push($scope.objeto.letras[i]);
            }else{
                $scope.matrix.push(row);
                row = [];
            }
        }
        
        $scope.nPalabras = $scope.objeto.palabras.length;
    };
    
    var palabra = "";
    var parents = [];
    var indexes = [];
    
    $scope.funciona = function(parent, index, elem){
        if($scope.counter > 0){
            var x = document.getElementById("elem"+parent+"-"+index);
            x.style.background = "grey";
            parents.push(parent);
            indexes.push(index);
            palabra = palabra + elem;
            angular.forEach($scope.objeto.palabras, function(p){
                if(palabra === p){
                   
                    $scope.nPalabras--;
                    for (i = 0; i<parents.length; i++){
                        var x = document.getElementById("elem"+parents[i]+"-"+indexes[i]);
                        x.style.background = "#33CD5F";
                    }
                    palabra = "";
                    parents = [];
                    indexes = [];
                }
            })
            
            
            
            }
        }   
    
    $scope.clear = function(){
        for (i = 0; i<parents.length; i++){
            var x = document.getElementById("elem"+parents[i]+"-"+indexes[i]);
            x.style.background = "";
        }
        
        palabra = "";
        parents = [];
        indexes = [];
    }
    
    
    $scope.loadParams = function(){
        //Parametros a enviar 
        $scope.modeParams = {
            modalidadSeleccionada:'Preguntas',
            por: $scope.modo,
            contador: $scope.contador+1,
            puntos: $scope.puntos
        };
        $scope.unitParams = {
            modalidadSeleccionada:'Video',
            por: $scope.modo,
            contador: $scope.contador+1,
            puntos: $scope.puntos
        };
        
    }
    
    //Funciones
        
    $scope.siguiente = function(){
        $scope.stopTimer();
        if($scope.nPalabras === 0){
            dbarray.submitJugada($scope.objeto, 1, $scope.email, 5);
            $scope.puntos++;
        }else{
            dbarray.submitJugada($scope.objeto, 0, $scope.email, 5);
        }
        
        $scope.loadParams();
        $state.go('sopaDeLetras', $scope.modeParams);
        };
    $scope.exit = function(){
        
        if($scope.nPalabras === 0){
            dbarray.submitJugada($scope.objeto, 1, $scope.email, 5);
            $scope.puntos++;
        }else{
             dbarray.submitJugada($scope.objeto, 0, $scope.email, 5);
        }
            
        dbarray.savePoints($scope.puntos, $scope.email);
        $state.go('menu.home');
        };  
        
    $scope.comprobar = function(){
            
        $scope.resultado++;
    };
    

    
    /////////////////////////////////////////////////////////  
    /////////////////////////Temporizador/////////////////////// 
      
      $scope.counter = 120;
    
    $scope.onTimeout = function() {
        if($scope.counter ===  0) {
            $scope.stopTimer();
            if($scope.contador<5){
                $scope.siguiente();
            }else{
                $scope.exit();
            }
            return;
        }
        $scope.counter--;
        mytimeout = $timeout($scope.onTimeout, 1000);
    };
    $scope.startTimer = function() {
        mytimeout = $timeout($scope.onTimeout, 1000);
    };
    // stops and resets the current timer
    $scope.stopTimer = function() {
        $timeout.cancel(mytimeout);
    };
    
    /////////////////////////////////////////////////////////  
    ///////////////////////////////////////////////////////// 
        
        
        
}])
 