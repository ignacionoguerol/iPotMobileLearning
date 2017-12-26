function Pregunta(){
    
    this.pregunta = '';
    
    this.respuestas = '';
        
    this.correcta = '';
    
    this.init = function(pregunta){
    
    this.pregunta = pregunta;
    
    this.respuestas = [
        {id: 'Mechanotherapy'},
        {id: 'Hydrotherapy'},
        {id: 'Kinesitherapy'},
        {id: 'Electrotherapy'},
        {id: 'All answers are correct'}
        ];
        
    this.correcta = 'All answers are correct';
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



angular.module('app.services', [])
.service('pregunta', Pregunta)
.service('video', Video)
.service('imagen', Imagen);





