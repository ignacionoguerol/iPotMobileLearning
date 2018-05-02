import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ModulosService {

  array;

  constructor(private db: AngularFireDatabase) {
    this.array = [];
  }

  loadList(curso: string){
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

  getList(){
    return this.array;
  }
}
