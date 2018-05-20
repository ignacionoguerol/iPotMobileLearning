import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import {GestoresService} from '../gestores.service';
import {CursosService} from '../cursos.service';
import {Gestor} from '../gestor';
import {Curso} from '../curso';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  admin: boolean;
  gestor: boolean;
  config: boolean;
  gest: Gestor;
  curso: Curso;

  constructor(private loginService: LoginService, private router: Router, private afAuth: AngularFireAuth,
              private gestoresService: GestoresService, private cursosService: CursosService, public snackBar: MatSnackBar) {
    this.admin = false;
    this.gestor = false;
    this.soyAdmin();
    this.soyGestor();
    this.gest = new Gestor();
    this.curso = new Curso();
    this.config = false;
  }

  ngOnInit() {

  }

  logout() {
    const self = this;
    this.loginService.logout().then(function() {
      self.router.navigateByUrl('/login');
    });
  }

  soyAdmin() {
    this.loginService.soyAdmin().subscribe(res => {
      this.admin = (res === this.afAuth.auth.currentUser.uid);
    });
  }

  soyGestor() {
    const self = this;
    this.gestoresService.loadGestor().subscribe(res => {
      if (res) {
        self.gestor = true;
        const json = JSON.parse(JSON.stringify(res));
        this.gest.curso = json.curso;
        this.gest.email = json.email;
        this.gest.nombre = json.nombre;
        this.gest.uid = json.uid;

        this.cursosService.getCurso(this.gest.curso).subscribe(res => {
          const json = JSON.parse(JSON.stringify(res));
          this.curso.nombre = json.nombre;
          this.curso.gestor = json.gestor;
          this.curso.id = json.id;
        });
    } else {
        //this.soyUsuario();
      }
    });
  }

  click() {
    if (this.config) {
      this.config = false;
    } else {
      this.config = true;
    }
  }
  resetPassword() {
    this.loginService.resetPassword(this.gest.email).then(ret => {
      this.openSnackBar('Password reset email sent', 'OK');
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  soyUsuario() {
      console.log(this.admin);
      console.log(this.gestor);
      if (!this.admin && !this.gestor) {
        this.router.navigateByUrl('/login');
      }
  }

}
