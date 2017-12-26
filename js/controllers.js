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
        { 'id':'sopaDeLetras2', 'label':'Preguntas'},
        { 'id':'video', 'label':'Video'},
        { 'id':'imagen', 'label':'Imagen'},
        { 'id':'sopaDeLetras', 'label':'Sopa de Letras'},
        { 'id':'ahorcado', 'label':'Ahorcado'},
        { 'id':'jeroglifico', 'label':'Jeroglífico'},
        { 'id':'puzzle', 'label':'Puzzle'}
        
    ];
    
    
    //funcion de cada boton
    
    $scope.juegoTema = function(){
        $state.go('ahorcado', $scope.tema);
    };
    
    $scope.juegoModalidad = function(){
        $state.go($scope.modalidad.modalidadSeleccionada, $scope.modalidad);
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
   
.controller('rankingCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

}])
   
.controller('profileCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('menuCtrl', ['$scope', '$stateParams', '$ionicUser', '$ionicAuth', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicUser, $ionicAuth, $state) {
    
    $scope.email = $ionicUser.details.email;
    
    $scope.name = $ionicUser.details.username;
    

    $scope.logout = function(){
        $ionicAuth.logout();
        $state.go('login');
    };
    
}
    

])
   
.controller('loginCtrl', ['$scope', '$stateParams', '$ionicUser', '$ionicAuth', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicUser, $ionicAuth, $state) {

    $scope.data = {
        'email': '',
        'password': ''
    };
    
    $scope.error = '';
    
    if ($ionicAuth.isAuthenticated()) {
        // Make sure the user data is going to be loaded
        $ionicUser.load().then(function() {});
        $state.go('menu.home'); 
    }
    
    $scope.login = function(){
        $scope.error = '';
        $ionicAuth.login('basic', $scope.data).then(function(){
            $state.go('menu.home');
        }, function(){
            $scope.error = 'Error logging in. Try Again!';
        });
    };

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
    video.init('¿Que técnica se describe en el video');
    
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
            $state.go('jeroglifico',  $scope.unitParams);
        }
    }
    
    $scope.exit = function(){
         $state.go('menu.home');
     } 
     
     $scope.comprobar = function(){
        $scope.stopTimer();
        
         if ($scope.objeto.selected === $scope.objeto.correcta){
             $scope.resultado = 'Correcto!';
         }else{
             $scope.resultado = 'Has fallado!';
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
    imagen.init('¿Qué aparece en la imagen?');
    
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
            $state.go('ahorcado',  $scope.unitParams);
        }
    }
    
    $scope.exit = function(){
         $state.go('menu.home');
     } 
     
     $scope.comprobar = function(){
        $scope.stopTimer();
        
         if ($scope.objeto.selected === $scope.objeto.correcta){
             $scope.resultado = 'Correcto!';
         }else{
             $scope.resultado = 'Has fallado!';
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
   
.controller('jeroglificoCtrl', ['$scope', '$stateParams', '$state', '$timeout', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $timeout){

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
        pista : 'Palabra clave',
        respuestas: 'Keywords',
        inputText: '',
        url: 'https://image.ibb.co/dg77ca/Ejemplo_2.png'
    };
    
    $scope.resultado = '';
    
    $scope.resuelto = false;
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
            $state.go('jeroglifico', $scope.modeParams);
        }else{
            $state.go('imagen',  $scope.unitParams);
        }
    }
    
    $scope.exit = function(){
         $state.go('menu.home');
     } 
     
     $scope.comprobar = function(){
        $scope.stopTimer();
        $scope.resuelto = true;
        
         if ($scope.objeto.inputText === $scope.objeto.respuestas){
             $scope.resultado = 'Correcto!';
         }else{
             $scope.resultado = 'Has fallado!';
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
   
.controller('ahorcadoCtrl', ['$scope', '$stateParams', '$state', '$timeout', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $timeout){

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
        pista : 'Function of the physiotherapist',
        palabra: 'Management',
        url: ''
    };
    
    $scope.letraSeleccionada = '';
    $scope.letrasFalladas = '';
    $scope.letrasAcertadas = '';
    $scope.fallos = 0;
    $scope.intentos = 7;
    $scope.aciertos = 0;
    
    
    
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
            $state.go('ahorcado', $scope.modeParams);
        }else{
            $state.go('jeroglifico',  $scope.unitParams);
        }
    };
    
    $scope.exit = function(){
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
            $scope.letrasFalladas += letra.toUpperCase();
        }
        
        
    };
            

    $scope.generarVectorAhorcado = function(){
    
    for (var i = 0, len = $scope.objeto.palabra.length; i < len; i++) {
        document.getElementById("tabla-ahorcado").innerHTML += '<td   style=\'color: white\'class="vectorAhorcado letra-' 
        + $scope.objeto.palabra[i].toUpperCase() + '">' + $scope.objeto.palabra[i] + '</td>';
        }
    };
      
      
      /////////////////////////////////////////////////////////  
      /////////////////////////////////////////////////////////  
    
    $scope.counter = 30;
    
    $scope.onTimeout = function() {
        if($scope.counter ===  0) {
            $timeout.cancel(mytimeout);
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
        
       
        
}




])
   
.controller('preguntasCtrl', ['$scope', '$stateParams', '$state', '$timeout', 'pregunta', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $timeout, pregunta) {
    
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
    
    
    //Inicializar objecto pregunta
    pregunta.init('¿Cómo te llamas?');
    
    //Variables propias de cada pregunta
    $scope.objeto = {
        pregunta : pregunta.getPregunta(),
        respuestas: pregunta.getRespuestas(),
        selected:'',
        correcta: pregunta.getCorrecta()
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
    
    //Funciones
        
    $scope.siguiente = function(){
        $scope.stopTimer();
        if($scope.modo === 'Mode'){
            $state.go('preguntas', $scope.modeParams);
        }else{
            $state.go('ahorcado', $scope.unitParams);
        }
    };
    
    $scope.exit = function(){
         $state.go('menu.home');
        };  
        
    $scope.comprobar = function(){
        $scope.stopTimer();
        
         if ($scope.objeto.selected === $scope.objeto.correcta){
             $scope.resultado = 'Correcto!';
         }else{
             $scope.resultado = 'Has fallado!';
         }
            
        
    };
    
    /////////////////////////////////////////////////////////  
    /////////////////////////Temporizador/////////////////////// 
      
      $scope.counter = 30;
    
    $scope.onTimeout = function() {
        if($scope.counter ===  0) {
            $scope.stopTimer();
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
   
.controller('puzzleCtrl', ['$scope', '$stateParams', '$state', '$timeout', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
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
        pista : 'Institutionalization of physiotherapy',
        
        desordenadas: [
            {'id': 'Practitioner', 'orden': '', 'real': 3},
            {'id': 'Medical Technician Assistant', 'orden': '', 'real':1},
            {'id': 'Physical Therapy', 'orden': '', 'real':2}
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
    
    $scope.orden = 1;
    
    //Funciones
        
    $scope.siguiente = function(){
        $scope.stopTimer();
        if($scope.modo === 'Mode'){
            $state.go('puzzle', $scope.modeParams);
        }else{
            $state.go('ahorcado', $scope.unitParams);
        }
    };
    
    $scope.exit = function(){
         $state.go('menu.home');
        };  
        
    $scope.comprobar = function(palabra){
        $scope.stopTimer();
        
        for (var i in $scope.objeto.desordenadas){
            if($scope.objeto.desordenadas[i].id === palabra && $scope.objeto.desordenadas[i].orden === ''){
                $scope.objeto.desordenadas[i].orden = $scope.orden;
                $scope.orden++;
            }
        }
        
        if($scope.orden>$scope.objeto.desordenadas.length){
            for (var e in $scope.objeto.desordenadas){
                if($scope.objeto.desordenadas[e].orden !== $scope.objeto.desordenadas[e].real){
                    $scope.resultado = 'Has fallado!';
                    return;
                }
            }
            $scope.resultado = 'Correcto!';
        }
        
       
    };
    
    /////////////////////////////////////////////////////////  
    /////////////////////////Temporizador/////////////////////// 
      
      $scope.counter = 30;
    
    $scope.onTimeout = function() {
        if($scope.counter ===  0) {
            $scope.stopTimer();
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
   
.controller('sopaDeLetrasCtrl', ['$scope', '$stateParams', '$state', '$timeout', 'pregunta', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $timeout, pregunta) {
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
    
    //Inicializar objecto pregunta
    pregunta.init('Fisioterapia Asiática');
    
    //Variables propias de cada pregunta
    $scope.objeto = {
        pregunta : pregunta.getPregunta(),
        respuestas: pregunta.getRespuestas(),
        selected:'',
        correcta: pregunta.getCorrecta()
    };
    
    $scope.tabla = '';
    var A = 0;
    
    for (var i = 0; i < 12; i++) {
        $scope.tabla += '<div class="divTableRow" >';
        
        for (var j = 0; j < 8; j++) {
            $scope.tabla += '<div class="divTableCell"><a href=#/"alert()">A</a></div>';
        }
        $scope.tabla += '</div>';
    }
    
    //Se añade la tabla generada al elemento HTML
    document.getElementById("sopaLetras").innerHTML = $scope.tabla;
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
    
    //Funciones
        
    $scope.siguiente = function(){
        $scope.stopTimer();
        if($scope.modo === 'Mode'){
            $state.go('preguntas', $scope.modeParams);
        }else{
            $state.go('ahorcado', $scope.unitParams);
        }
    };
    
    $scope.exit = function(){
         $state.go('menu.home');
        };  
        
    $scope.comprobar = function(){
        $scope.stopTimer();
        
         if ($scope.objeto.selected === $scope.objeto.correcta){
             $scope.resultado = 'Correcto!';
         }else{
             $scope.resultado = 'Has fallado!';
         }
            
        
    };
    

    
    /////////////////////////////////////////////////////////  
    /////////////////////////Temporizador/////////////////////// 
      
      $scope.counter = 30;
    
    $scope.onTimeout = function() {
        if($scope.counter ===  0) {
            $scope.stopTimer();
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
 