import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/';
import { LoginService } from './login.service';
import { User } from 'firebase';
import { Gestor } from './gestor';


@Injectable()
export class GestoresService {

  constructor(private db: AngularFireDatabase, private loginService: LoginService) {}

  getList() {
    const self = this;
    const array = [];
    this.db.list('/gestores').valueChanges().subscribe(gestores => {
      gestores.forEach(action => {
        const obj: Gestor = JSON.parse(JSON.stringify(action));
        array.push(obj);
      });
    });
    return array;
  }

  addGestor(name: string, email: string, password: string) {
    const self = this;
    this.loginService.emailSignUp(email, password).then(credential => {
        const url = 'gestores/' + credential.uid;
        const data = {
          nombre: name,
          email: email,
          uid: credential.uid
      };
      this.db.object(url).update(data).then(res => console.log(res));
    }).catch(error => console.log(error));
  }

  deleteGestor(uid: string) {
    const self = this;
    // this.loginService.deleteUser(uid).then(function() {
      self.deleteGestorData(uid);
    // }).catch(error => console.log(error));
  }

  deleteGestorData(uid: string) {
    const url = 'gestores/' + uid;
    this.db.object(url).remove();
  }

}
