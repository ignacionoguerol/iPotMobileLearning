function Pregunta(){
    
    this.pregunta = '';
    
    var respuestas = [];
        
    this.correcta = '';
    
    this.init = function(p){
    console.log("init");
    console.log(p);

    this.pregunta = p.pregunta;
    angular.forEach(p.opciones, function(opcion) {
                    respuestas.push(opcion); 
                    console.log(opcion);
                })
    
    /*this.respuestas = [
        {id: 'Mechanotherapy'},
        {id: 'Hydrotherapy'},
        {id: 'Kinesitherapy'},
        {id: 'Electrotherapy'},
        {id: 'All answers are correct'}
        ];*/
        
    var correcta = 'All answers are correct';
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
    
    var ref;
    
    this.init = function(campo){
        
        ref = firebase.database().ref().child(campo);
    }
    
    this.loadArray = function(){
        cuenta = [];
        array = $firebaseArray(ref)
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
}



angular.module('app.services', [])
.service('pregunta', Pregunta)
.service('video', Video)
.service('imagen', Imagen)
.service('dbarray', DBArray);




