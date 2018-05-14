import {Palabra} from './palabra';

export class Puzzle {
  num: string;
  numTema: string;
  tema: string;
  palabras: Palabra[];

  constructor() {
    this.num = null;
    this.tema = '';
    this.palabras = [];
  }

}
