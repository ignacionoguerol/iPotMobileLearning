import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Modulo } from './modulo';

@Injectable()
export class ModulosService {

  array;

  constructor(private db: AngularFireDatabase) {
    this.array = [];
  }

  loadList(curso: string) {
    const self = this;
    self.array = [];
    this.db.list('/cursos/' + curso + '/modulos').valueChanges().subscribe(modulos => {
      self.array.length = 0;
      modulos.forEach(modulo => {
        self.array.push(JSON.parse(JSON.stringify(modulo)));
      });
    });
    return self.array;
  }

  getList() {
    return this.array;
  }

  addModulo(curso: number, modulo: Modulo) {
    return this.db.object('cursos/' + curso + '/modulos/' + modulo.id ).update(modulo);
  }

  modifyModulo(curso: number, modulo: Modulo) {
    return this.db.object('cursos/' + curso + '/modulos/' + modulo.id ).update(modulo);
  }

  deleteModulo(curso: number, modulo: number) {
    return this.db.object('cursos/' + curso + '/modulos/' + modulo).remove();
  }
}
