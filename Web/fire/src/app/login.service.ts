import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from 'firebase';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class LoginService {

  usuario: User;
  user: Observable<User | null>;

  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private db: AngularFireDatabase) {
    this.user = this.afAuth.authState
      .switchMap((user) => {
        if (user) {
          return Observable.of(user);
        } else {
          return Observable.of(null);
        }
      });
   }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  resetPassword(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  deleteUser(uid: string) {
    return null;
  }


  checkSession() {
    this.afAuth.authState.subscribe(userData => this.usuario = userData);
    return this.usuario;
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  gitUser() {
    return this.afAuth.auth.currentUser;
  }

  soyAdmin() {
    const self = this;
    return this.db.object('/administrador').valueChanges();
  }

  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
  }

}
