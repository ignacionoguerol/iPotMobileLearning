import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class LoginService {

  usuario: User;
  user: Observable<User | null>;

  constructor(private afAuth: AngularFireAuth,
              private router: Router) {
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

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
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

  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
  }

}