import {Pareja} from './pareja';

export class Parejas {
  num: string;
  numTema: string;
  pista: string;
  i;
  r;

  constructor() {
    this.num = '';
    this.numTema = '';
    this.pista = '';
    this.i = {
      '1': new Pareja(),
      '2': new Pareja(),
      '3': new Pareja()
    };
    this.r = {
      '1': new Pareja(),
      '2': new Pareja(),
      '3': new Pareja()
    };
  }
}
