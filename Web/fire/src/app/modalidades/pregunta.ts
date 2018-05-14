export class Pregunta {
  num: string;
  numTema: string;
  correcta: string;
  pregunta: string;
  respuestas: string[];

  constructor() {
    this.num = null;
    this.correcta = '';
    this.pregunta = ''
    this.respuestas = [null];
  }

}


