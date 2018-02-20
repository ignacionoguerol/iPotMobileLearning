import { Curso } from './curso';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class CursosService {

  array;

  constructor(private db: AngularFireDatabase) {
    this.array = [];
    this.loadList();
  }

  loadList() {
    const self = this;
    self.array = [];
    this.db.list('/cursos').valueChanges().subscribe(cursos => {
      self.array.length = 0;
      cursos.forEach(action => {
        const obj: Curso = JSON.parse(JSON.stringify(action));
        self.array.push(obj);
      });
    });
    return self.array;
  }
  
  getList() {
    return this.array;
  }

  modifyCurso(id: number, name: string, gestor: string) {
    const data = {
      nombre: name,
      gestor: gestor
    };
    this.db.object('/cursos/' + id).update(data).then(res => console.log(res));
  }

  addCurso(id: number, name: string, gestor: string) {
    const data = {
      nombre: name,
      gestor: gestor,
      id: id
    };
    this.db.object('/cursos/' + id).update(data).then(res => console.log(res));
  }

  deleteCurso(id: number) {
    this.db.object('cursos/' + id).remove().then(res => console.log(res));
  }

}
