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
        navigator.vibrate(500);
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
   
.controller('helpCtrl', ['$scope', '$stateParams', '$ionicPopup', 'video', 'dbarray', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicPopup, video, dbarray) {
    
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
    
    $scope.video = video.getVideo();
    console.log("video: " + $scope.video);
   
    
    
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
   
.controller('loginCtrl', ['$scope', '$stateParams', '$state', 'dbarray', 'video', '$timeout', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, dbarray, video, $timeout) {
    
    //GARGA EL VIDEO
    $scope.videos = dbarray.getVideo();
    
    $timeout(function() {
        video.init($scope.videos[0]);
    }, 2000);
    
    var init = dbarray.init("usuarios");
    $scope.usuarios = dbarray.loadArrayUsuarios("usuarios");
    
    ///////

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
   
.controller('hieroglyphicCtrl', ['$scope', '$stateParams', '$state', '$timeout', 'dbarray', 'jeroglifico', '$ionicPlatform', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
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
        $state.go('hieroglyphic', $scope.modeParams);
        //}else{
            //$state.go('preguntas',  $scope.unitParams);
        //}
    }
    
    $scope.exit = function(){
         $scope.stopTimer();
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
   
.controller('hangmanCtrl', ['$scope', '$stateParams', '$state', '$timeout', 'dbarray', 'ahorcado', '$ionicPlatform', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $timeout, dbarray, ahorcado, $ionicPlatform){

    //Get user data
     firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            $scope.email = user.email;
        }else{
            $scope.email = anonimo;
        }
    })
    
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
        0: "https://s3.amazonaws.com/ionic-io-static/3oUiYSi5QSWGtjpQPIRX_1.png",
        1: "https://s3.amazonaws.com/ionic-io-static/Aj4OcyEvSmaz2VMBgfA3_2.png",
        2: "https://s3.amazonaws.com/ionic-io-static/Ux1oqQmjTzu5skS6ZHZp_3.png",
        3: "https://s3.amazonaws.com/ionic-io-static/hGIlliGRb2znoqOFsSbw_4.png",
        4: "https://s3.amazonaws.com/ionic-io-static/KUp5hpAVRXOTf5DagIUE_5.png",
        5: "https://s3.amazonaws.com/ionic-io-static/hNpVsMPYSdGvqrOzr3yj_6.png"
    }
    
    //variables scope
    $scope.letraSeleccionada = '';
    $scope.letrasFalladas = '';
    $scope.letrasAcertadas = '';
    $scope.fallos = 0;
    $scope.intentos = 5;
    $scope.aciertos = 0;
    
     var waitTime;
    //COMPROBAR TIPO DE USUARIO
    var init = dbarray.init("usuarios");
    $scope.usuarios = dbarray.loadArrayUsuarios("usuarios");
     
    if (init === 0){
        waitTime = 2000;
    }else if (init === 1){
        waitTime = 0;
    }
    
    $timeout(function() {
        angular.forEach($scope.usuarios, function(usuario){
            if(usuario.Email === $scope.email){
                if(usuario.Grado === 1){
                     $scope.grado = "AhorcadoFisioterapia"
                }else{
                     $scope.grado = "AhorcadoTerapia"
                }
            }
         });
        
        console.log("grado: " + $scope.grado);
        
         //Iniciar base de datos FIREBASE
        init = dbarray.init($scope.grado);
        $scope.preguntas = dbarray.loadArray($scope.grado);
    
        
        
       
        
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
            $state.go('hangman', $scope.modeParams);
        //}else{
           // $state.go('hieroglyphic',  $scope.unitParams);
        //}
    };
    
    $scope.guardar = function(){
        $scope.stopTimer();
         dbarray.savePoints($scope.puntos, $scope.email);
         $state.go('menu.home');
    }
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
            document.getElementById("tabla-ahorcado").innerHTML += '<td style=\'color: white;\' class="vectorAhorcado letra-'      
            + $scope.objeto.palabra[i].toUpperCase() + ' text-center">' + $scope.objeto.palabra[i] + '</td>';
        
            }
    };
      
      
      /////////////////////////////////////////////////////////  
      /////////////////////////////////////////////////////////  
    
    $scope.counter = 60;
    
    $scope.onTimeout = function() {
        if($scope.counter ===  0) {
            $timeout.cancel(mytimeout);
            // Apunta error si se acaba el tiempo
            dbarray.submitJugada(ahorcado.getPalabra(), 0, $scope.email, 1);
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
   
.controller('questionsCtrl', ['$scope', '$stateParams', '$state', '$timeout', '$firebaseArray', 'pregunta', 'dbarray', '$q', '$ionicPlatform', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $timeout, $firebaseArray, pregunta, dbarray, $q, $ionicPlatform) {
    
    //Get user data
     firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            $scope.email = user.email;
        }else{
            $scope.email = anonimo;
        }
    })
    
    
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
    
    var waitTime;
    
    //COMPROBAR TIPO DE USUARIO
    var init = dbarray.init("usuarios");
    $scope.usuarios = dbarray.loadArrayUsuarios("usuarios");
     
    if (init === 0){
        waitTime = 2000;
    }else if (init === 1){
        waitTime = 0;
    }
    
    $timeout(function() {
    angular.forEach($scope.usuarios, function(usuario){
        if(usuario.Email === $scope.email){
            if(usuario.Grado === 1){
                 $scope.grado = "PreguntasFisioterapia"
            }else{
                 $scope.grado = "PreguntasTerapia"
            }
        }
     });
     
        //Iniciar base de datos FIREBASE
        init = dbarray.init($scope.grado);
        $scope.preguntas = dbarray.loadArray($scope.grado);
        
        
        
        if (init === 0){
            waitTime = 2000;
        }else if (init === 1){
            waitTime = 0;
        }
        
        
        
        $scope.show = true; // controlla la visibilidad de la plantilla y el loading.
        
        $timeout(function() {
            $scope.show = false;
            var random = Math.floor(Math.random() * ($scope.preguntas.length));
            $scope.r = random;
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
        $state.go('questions', $scope.modeParams);
        //}else{
         //   $state.go('imagen', $scope.unitParams);
        //}
    };
    
    
    
    $scope.exit = function(){
        $scope.stopTimer();
        dbarray.savePoints($scope.puntos, $scope.email);
        $state.go('menu.home');
        }; 
        
     $scope.guardar = function(){
        $scope.stopTimer(); 
        dbarray.savePoints($scope.puntos, $scope.email);
        $state.go('menu.home');
        };
        
    $scope.comprobar = function(p, id){
        
        console.log($scope.r)
        
        if($scope.resultado === ''){
            $scope.objeto.selected = p;
            $scope.stopTimer();
            $scope.resultado = p;
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
        
    $scope.comprobar = function(palabra, index){
        var x = document.getElementById("list-" + index)
        if(!x.classList.contains('Correcto')){
            
            x.classList.add("Correcto");
            x.style.background = "white";
            x.style.color = "white";
            
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
   
.controller('couplesCtrl', ['$scope', '$stateParams', '$state', '$timeout', 'dbarray', '$ionicPlatform', 'couples', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $timeout, dbarray, $ionicPlatform, couples) {
    
    
    //Get user data
     firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            $scope.email = user.email;
        }else{
            $scope.email = anonimo;
        }
    })
    
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
    
    
    var waitTime;
    
    //COMPROBAR TIPO DE USUARIO
    var init = dbarray.init("usuarios");
    $scope.usuarios = dbarray.loadArrayUsuarios("usuarios");
     
    if (init === 0){
        waitTime = 2000;
    }else if (init === 1){
        waitTime = 0;
    }
    
    $timeout(function() {
        angular.forEach($scope.usuarios, function(usuario){
            if(usuario.Email === $scope.email){
                if(usuario.Grado === 1){
                     $scope.grado = "ParejasFisioterapia"
                }else{
                     $scope.grado = "ParejasFisioterapia"
                }
            }
         });
     
        //Iniciar base de datos FIREBASE
        init = dbarray.init($scope.grado);
        $scope.preguntas = dbarray.loadArray($scope.grado);
        
        
        if (init === 0){
            waitTime = 2000;
        }else if (init === 1){
            waitTime = 0;
        }
        
        $scope.show = true; // controlla la visibilidad de la plantilla y el loading.
        
        $timeout(function() {
            $scope.show = false;
            var random = Math.floor(Math.random() * ($scope.preguntas.length));
            $scope.r = random;
            couples.init($scope.preguntas[random]);
        
                //Variables propias de cada pregunta
            $scope.objeto = {
                pista : couples.getPista(),
                i: couples.getI(),
                r: couples.getR()
                
            };
            
            $scope.primera = {
                p: '',
                i: ''
            }
            
            $scope.segunda = {
                p: '',
                i: ''
            }
            
            $scope.colores = {
                1: '506FA4',
                2: 'F7A56B',
                3: 'F7C56B'
            }
            $scope.colorCorrecto = '#439B90';
            $scope.resultado = '';
            $scope.click = 0;
            $scope.fallos = 0;
            
            $scope.puntos = 0;
            if($stateParams.puntos !== ''){
                $scope.puntos = $stateParams.puntos;
            }
            
            $scope.startTimer();
            
            $scope.resultado = '';
            
            $scope.toque = 0;
        
        }, waitTime);
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
            contador: $scope.contador+1
        };
    }  
    
    $scope.siguiente = function(){
        
        if($scope.fallos>1){
            $scope.loadParams();
            //dbarray.submitJugada(pregunta.getPregunta(), 1, $scope.email, 1);
        }else{
            $scope.puntos++;
            $scope.loadParams();
            //dbarray.submitJugada(pregunta.getPregunta(), 0, $scope.email, 1);
        }
        
        $scope.stopTimer();
        $state.go('couples', $scope.modeParams);
    };
    
    $scope.exit = function(){
         if($scope.fallos>1){
           dbarray.savePoints($scope.puntos, $scope.email);
        }else{
            $scope.puntos++;
            dbarray.savePoints($scope.puntos, $scope.email);
        }
        $scope.stopTimer();
        $state.go('menu.home');
        
    };  
    
    $scope.home = function(){
        $scope.stopTimer();
        dbarray.savePoints($scope.puntos, $scope.email);
        $state.go('menu.home');
    };  
        
    $scope.seleccionar = function(p, i){
        $scope.toque = 1;
        if($scope.primera.p === '' && !document.getElementById("top-" + i).classList.contains('Correcto')){
            $scope.click++;
            $scope.primera.p = p;
            $scope.primera.i = i;
            
            var x = document.getElementById("top-" + i);
            x.style.background = '#'+$scope.colores[$scope.click];
            $scope.click--;
        }
    }
    
    $scope.comprobar = function(p, i){
        if($scope.toque == 1){
            $scope.click++;
            $scope.toque = 0;
            if($scope.segunda.p === ''  && !document.getElementById("top-" + i).classList.contains('Correcto') ){
                $scope.segunda.p = p;
                $scope.segunda.i = i;
                
                var x = document.getElementById("top-" + $scope.primera.i);
             var y = document.getElementById("bot-" + $scope.segunda.i);
                
                 if ($scope.primera.p === $scope.segunda.p){
                    x.style.background = $scope.colorCorrecto;
                    y.style.background = $scope.colorCorrecto;
                    x.classList.add("Correcto");
                    y.classList.add("Correcto");
                    
                    $scope.primera.p = '';
                    $scope.segunda.p = '';
                    
                    $scope.correctas++;
                    
                }else{
                    $scope.fallos++;
                    $scope.click--;
                    x.style.background = "";
                    y.style.background = "";
                    
                    $scope.primera.p = '';
                    $scope.segunda.p = '';
                }
                
            }
        }
       
    };
    
    /////////////////////////////////////////////////////////  
    /////////////////////////Temporizador/////////////////////// 
      
      $scope.counter = 60;
    
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
   
.controller('alphabethSoupCtrl', ['$scope', '$stateParams', '$state', '$timeout', '$compile', 'sopa', '$firebaseArray', 'dbarray', '$ionicPlatform', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $timeout, $compile, sopa, $firebaseArray, dbarray, $ionicPlatform) {
    
    
     //Get user data
     firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            $scope.email = user.email;
        }else{
            $scope.email = anonimo;
        }
    })
    
    
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
    
    var waitTime;
     
     //COMPROBAR TIPO DE USUARIO
    var init = dbarray.init("usuarios");
    $scope.usuarios = dbarray.loadArrayUsuarios("usuarios");
     
    if (init === 0){
        waitTime = 2000;
    }else if (init === 1){
        waitTime = 0;
    }
    
    $timeout(function() {
        angular.forEach($scope.usuarios, function(usuario){
            if(usuario.Email === $scope.email){
                if(usuario.Grado === 1){
                     $scope.grado = "SopaFisioterapia"
                }else{
                     $scope.grado = "SopaTerapia"
                }
            }
         });
        //Iniciar base de datos FIREBASE
        var init = dbarray.init($scope.grado);
        $scope.preguntas = dbarray.loadArray($scope.grado);
        
        
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
        $state.go('alphabethSoup', $scope.modeParams);
        };
        
    $scope.exit = function(){
        $scope.stopTimer();
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
    
    $scope.guardar = function(){
        dbarray.savePoints($scope.puntos, $scope.email);
        $state.go('menu.home');
    }
    
    
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
 