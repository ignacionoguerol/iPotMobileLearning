import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import {GestoresService} from '../gestores.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  admin: boolean;
  gestor: boolean;
  constructor(private loginService: LoginService, private router: Router, private afAuth: AngularFireAuth,
              private gestoresService: GestoresService) {
    this.admin = false;
    this.gestor = true;
    this.soyAdmin();
    this.soyGestor();
  }

  ngOnInit(){

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
      console.log('ADMINISTRADOR = ' + this.admin);
    });
  }


  soyGestor() {
    const arrayGestores =  this.gestoresService.getList();
    arrayGestores.forEach(gestor => {
      if (gestor.uid === this.afAuth.auth.currentUser.uid) {
        this.gestor = true;
      }
    });
    console.log('GESTOR = ' + this.gestor);
  }

}
