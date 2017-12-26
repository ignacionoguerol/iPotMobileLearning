function Pregunta(){
    
    this.pregunta = '';
    
    var respuestas = [];
        
    this.correcta = '';
    
    this.id;
    
    this.init = function(p){
    
    respuestas = [];

    this.pregunta = p.pregunta;
    angular.forEach(p.opciones, function(opcion) {
                    respuestas.push(opcion); 
                })
    this.correcta = p.correcta;
    
    this.id = p.$id;
    
    console.log(p);
    }
    
    this.getPregunta = function(){
        return this.pregunta;
    };
    
    this.getRespuestas = function(){
        return respuestas;
    };
    
    this.getCorrecta = function(){
        return this.correcta;
    };
    
    this.getId = function(){
        return this.id;
    }
}

function Video(){
    
    this.pregunta = '';
    
    this.respuestas = '';
        
    this.correcta = '';
    
    this.url = '';
    
    this.init = function(pregunta){
    
    this.pregunta = pregunta;
    
    this.respuestas = [
        {id: 'True'},
        {id: 'False'}
        ];
        
    this.correcta = 'True';
    
    this.url = 'DCz4RStjxUM';
    }
    
    this.getPregunta = function(){
        return this.pregunta;
    };
    
    this.getRespuestas = function(){
        return this.respuestas;
    };
    
    this.getCorrecta = function(){
        return this.correcta;
    };
    
    this.getUrl = function(){
        return this.url;
    };
}

function Imagen(){
    
    this.pregunta = '';
    
    this.respuestas = '';
        
    this.correcta = '';
    
    this.url = '';
    
    this.init = function(pregunta){
    
    this.pregunta = pregunta;
    
    this.respuestas = [
        {id: 'True'},
        {id: 'False'}
        ];
        
    this.correcta = 'False';
    
    this.url = 'http://fisioterapiabailio.com/wp-content/uploads/2015/04/Logo-Fisioterapia-Slider.png';
    }
    
    this.getPregunta = function(){
        return this.pregunta;
    };
    
    this.getRespuestas = function(){
        return this.respuestas;
    };
    
    this.getCorrecta = function(){
        return this.correcta;
    };
    
    this.getUrl = function(){
        return this.url;
    };
}

function DBArray($firebaseArray){
    
    var cuenta = [];
    var array;
    var ref = [];
    
    this.init = function(campo){
        if(ref[campo] === undefined){
        ref[campo] = firebase.database().ref().child(campo);
        return 0;
        }else{
            return 1;
        }
    }
    
    this.loadArray = function(campo){
        cuenta = [];
        array = $firebaseArray(ref[campo])
        array.$loaded()
            .then(function(){
                 angular.forEach(array, function(pregunta) {
                    cuenta.push(pregunta);
                }) 
        });
        return cuenta;
    }
    
    this.getArray = function(){
        return cuenta;
    }
    
    this.getRef =function(){
        return ref;
    }
    
    this.submitJugada = function(idPreg, res, user, mod){
        this.init("jugadas");
        $firebaseArray(ref["jugadas"]).$add({
            usuario: user,
            idPregunta: idPreg,
            resultado: res,
            modalidad: mod
        });
    }
}



angular.module('app.services', [])
.service('pregunta', Pregunta)
.service('video', Video)
.service('imagen', Imagen)
.service('dbarray', DBArray);




