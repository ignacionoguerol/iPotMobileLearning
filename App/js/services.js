function Pregunta(){
    
    this.pregunta = '';
    
    var respuestas = [];
        
    this.correcta = '';
    
    this.num = '';
    
    this.numTema = '';

    this.init = function(p){
    
    respuestas = [];

    this.pregunta = p.pregunta;
    
    angular.forEach(p.respuestas, function(opcion) {
                    respuestas.push(opcion); 
                })
    this.correcta = p.correcta;
    this.num = p.num;
    this.numTema = p.numTema;
    
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
    
    this.getNum = function(){
        return this.num;
    }
    
    this.getNumTema = function(){
        return this.numTema;
    }
}

function Sopa(){
    
    this.pregunta = '';
    this.letras = '';
    var palabras = [];
    this.id;
    this.num = '';
    this.numTema = '';
    
    this.init = function(p){
        palabras = [];
        this.pregunta = p.pregunta;
        
        angular.forEach(p.palabras, function(opcion) {
                        palabras.push(opcion); 
                    })
        this.letras = p.letras;
        this.id = p.$id;
        this.num = p.num;
        this.numTema = p.numTema;
    }
    
    this.getPregunta = function(){
        return this.pregunta;
    };
    
    this.getPalabras = function(){
        return palabras;
    };
    
    this.getLetras = function(){
        return this.letras;
    };
    
    this.getCorrecta = function(){
        return this.correcta;
    };
    
    this.getId = function(){
        return this.id;
    }
    
    this.getNum = function(){
        return this.num;
    }
    
    this.getNumTema = function(){
        return this.numTema;
    }
}

function Ahorcado(){
    
    this.pista;
    this.palabra;
    this.num = '';
    this.numTema = '';
    
    this.init = function(p){

        this.pista = p.Pista;
        this.palabra = p.Palabra;
        this.num = p.num;
        this.numTema = p.numTema; 
    }
    
    this.getPalabra = function(){
        return this.palabra;
    };
    
    this.getPista = function(){
        return this.pista;
    };
    
    this.getNum = function(){
        return this.num;
    }
    
    this.getNumTema = function(){
        return this.numTema;
    }
}

function Jeroglifico(){
    
    this.pista;
    this.respuesta;
    this.id;
    this.url;
    this.num = '';
    this.numTema = '';
    
    this.init = function(p){
        this.pista = p.tema;
        this.respuesta = p.respuesta;
        this.id = p.$id;
        this.url = p.url;
        this.num = p.num;
        this.numTema = p.numTema;
    }
    
    this.getRespuesta = function(){
        return this.respuesta;
    };
    
    this.getPista = function(){
        return this.pista;
    };
    
    this.getId = function(){
        return this.id;
    };
    
    this.getUrl = function(){
        return this.url;
    }
    
    this.getNum = function(){
        return this.num;
    }
    
    this.getNumTema = function(){
        return this.numTema;
    }
    
}

function Video(){
    
    this.video = '';
    
    this.init = function(video){
    this.video = video.id;
    console.log("video: " + this.video);
    }
    
    this.getVideo = function(){
        return this.video;
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

function Puzzle(){
    
    this.palabras = '';
    this.tema = '';
    this.num = '';
    this.numTema = '';
    
    this.init = function(p){
    
        this.palabras = p.palabras;
        this.tema = p.tema;
        this.num = p.num;
        this.numTema = p.numTema; 
    }
    
    this.getPalabras = function(){
        return this.palabras;
    };
    
    this.getTema = function(){
        return this.tema;
    };
    
    this.getNum = function(){
        return this.num;
    }
    
    this.getNumTema = function(){
        return this.numTema;
    }
    
}

function Couples(){
    
    this.pista = '';
    var i = [];
    var r = [];
    this.num = '';
    this.numTema = '';
    
    this.init = function(p){
    
        i = [];
        r = [];
        
        this.pista = p.pista;
        this.num = p.num;
        this.numTema = p.numTema; 
        
        angular.forEach(p.i, function(opcion) {
                        i.push(opcion); 
                    })
                    
        angular.forEach(p.r, function(opcion) {
                        r.push(opcion); 
                    })
    }
    
    this.getPista = function(){
        return this.pista;
    };
    
    this.getI = function(){
        return i;
    };
    
    this.getR = function(){
        return r;
    };
    
    this.getNum = function(){
        return this.num;
    }
    
    this.getNumTema = function(){
        return this.numTema;
    }
    
}


function DBArray($firebaseArray, $timeout, $ionicPopup, $q){
    
    var cuenta = [];
    var array;
    var ref = [];
    var usuarios;
    var nombre = "";
    
    this.init = function(campo){
        console.log(ref[campo])
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
                angular.forEach(array, function(array2){
                 angular.forEach(array2, function(pregunta) {
                    cuenta.push(pregunta);
                    })
                })
        });
        return cuenta;
    }
    
    this.loadArrayUsuarios = function(campo){
        var cuenta = [];
        array = $firebaseArray(ref[campo])
        array.$loaded().then(function(){
                angular.forEach(array, function(pregunta){
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
    
    this.submitJugada = function(numTema, num, res, user, mod){
        /*this.init("jugadas");
        $firebaseArray(ref["jugadas"]).$add({
            fecha: Date(),
            usuario: user,
            num: num,
            numTema: numTema,
            resultado: res,
            modalidad: mod
        });*/
    }
    
    this.savePoints = function(puntos, email){
        
        $ionicPopup.alert({
            title: 'You have got ' + puntos + ' points'
         });
         
        var init = this.init("usuarios");
        usuarios = this.loadArrayUsuarios("usuarios");
        var waitTime;
        
        if (init === 0){
            waitTime = 2000;
        }else if (init === 1){
            waitTime = 0;
        }
        
        $timeout(function() {
        
            angular.forEach(usuarios, function(usuario){
                if(usuario.Email === email){
                   
                    var p = usuario.puntos;
                    
                    if(p === "zero"){
                        p = puntos;
                    }else{
                        p = parseInt(p, 10) + puntos;
                    } 
                    ref["usuarios"].child(usuario.$id).update({"puntos" : p});
                }
            })
        
        }, waitTime);
    }
    
    this.changeNick = function(email, nick){
        
        $ionicPopup.alert({
            title: 'Your nick has been updated to ' + nick
         });
         
        var init = this.init("usuarios");
        usuarios = this.loadArrayUsuarios("usuarios");
        var waitTime;
        
        if (init === 0){
            waitTime = 2000;
        }else if (init === 1){
            waitTime = 0;
        }
        
        $timeout(function() {
        
            angular.forEach(usuarios, function(usuario){
                if(usuario.Email === email){
                    ref["usuarios"].child(usuario.$id).update({"nick" : nick});
                }
            })
        
        }, waitTime);
    }
    
    this.getVideo = function(){
        var video = [];
        this.init("Videos");
        array = $firebaseArray(ref["Videos"]);
         array.$loaded()
            .then(function(){
                angular.forEach(array, function(v){
                    video.push(v);
                });
            });
            
        return video;
    }
    
}

angular.module('app.services', [])
.service('pregunta', Pregunta)
.service('video', Video)
.service('imagen', Imagen)
.service('dbarray', DBArray)
.service('ahorcado', Ahorcado)
.service('jeroglifico', Jeroglifico)
.service('puzzle', Puzzle)
.service('sopa', Sopa)
.service('couples', Couples);