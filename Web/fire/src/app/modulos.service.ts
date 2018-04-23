import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ModulosService {

  array;

  constructor(private db: AngularFireDatabase) {
    this.array = [];
  }

  loadList() {}
}
