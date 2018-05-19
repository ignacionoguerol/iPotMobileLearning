import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/';
import { LoginService } from './login.service';
import { User } from 'firebase';
import { Gestor } from './gestor';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpResponse } from 'selenium-webdriver/http';

@Injectable()
export class GestoresService {

  array = [];
  gestor: Gestor;
  constructor(private db: AngularFireDatabase, private loginService: LoginService, private http: HttpClient) {
    this.loadList();
  }

  loadList() {
    const self = this;
    self.array = [];
    this.db.list('/gestores').valueChanges().subscribe(gestores => {
      self.array.length = 0;
      gestores.forEach(action => {
        const obj: Gestor = JSON.parse(JSON.stringify(action));
        self.array.push(obj);
      });
    });
    return self.array;
  }

  loadGestor() {
    const self = this;
    const uid = this.loginService.gitUser().uid;
    return this.db.object('/gestores/' + uid).valueChanges();
  }

  getList() {
    return this.array;
  }

  modificarGestor(uid: string, name: string) {
    const data = {
      'nombre' : name
    };
   return this.db.object('/gestores/' + uid).update(data);
  }

  addGestor(name: string, email: string): Observable<HttpResponse> {
    console.log('añadiendo gestor ' + name);
    const URL = 'https://us-central1-ipot-mobile-learning.cloudfunctions.net/addGestor';
    const data = {
      'email': email,
      'name': name
    };

    const ob: Observable<HttpResponse> = this.http.get(URL + '?name=' + name + '&email=' + email);
    console.log('devuelvo observable');
    console.log(data);
    console.log(ob);
    return ob;
  }

  deleteGestor(uid: string): Observable<HttpResponse> {
    const URL = 'https://us-central1-ipot-mobile-learning.cloudfunctions.net/deleteGestor';
    const data = {
      'uid': 'uid'
    };
    const ob: Observable<HttpResponse> = this.http.get(URL + '?uid=' + uid);
    console.log('devuelvo observable');
    console.log(ob);
    return ob;
  }

  getGestorName(uid: string) {
     let nombre = uid;
     this.array.forEach(gestor => {
      if (gestor.uid === uid) {
        nombre = gestor.nombre;
      }
    });
    return nombre;
  }

  istMe(email: string) {
    return email === this.loginService.gitUser().email;
  }

}
