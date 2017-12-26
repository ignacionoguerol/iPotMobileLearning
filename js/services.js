function Pregunta(){
    
    this.pregunta = '';
    
    this.respuestas = '';
        
    this.correcta = '';
    
    this.init = function(pregunta){
    
    this.pregunta = pregunta;
    
    this.respuestas = [
        {id: 'Mi nombre es Pepe'},
        {id: 'Mi nuevo nombre es Carlos'},
        {id: 'Ahora me llamo Lucas'},
        {id: 'Mi amigo se llama Juan'}
        ];
        
    this.correcta = 'Mi nombre es Pepe';
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
}

function Video(){
    
    this.pregunta = '';
    
    this.respuestas = '';
        
    this.correcta = '';
    
    this.url = '';
    
    this.init = function(pregunta){
    
    this.pregunta = pregunta;
    
    this.respuestas = [
        {id: 'Tecnica 1'},
        {id: 'Tecnica 2'},
        {id: 'Tecnica 3'},
        {id: 'Tecnica 4'}
        ];
        
    this.correcta = 'Tecnica 2';
    
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
        {id: 'Cabeza'},
        {id: 'Pie'},
        {id: 'Mano'},
        {id: 'Coche'}
        ];
        
    this.correcta = 'Coche';
    
    this.url = 'http://revistahsm.com/wp-content/uploads/2012/12/Coche-Mini.jpg';
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


angular.module('app.services', [])
.service('pregunta', Pregunta)
.service('video', Video)
.service('imagen', Imagen);





