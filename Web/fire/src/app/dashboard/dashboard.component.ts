import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  gestores: boolean;
  section;

  constructor(private loginService: LoginService, private router: Router) {
    this.gestores = false;
    this.section = '';
  }

  ngOnInit() {
  }

  showGestores() {
    if (this.gestores) {
      this.resetName();
      this.gestores = false;
    } else {
      this.changeName('Gestores');
      this.gestores = true;
    }
  }

  logout() {
    const self = this;
    this.loginService.logout().then(function() {
      self.router.navigateByUrl('/login');
    });
  }
  
  resetName() {
    this.section = '';
  }
  
  changeName(name: string) {
    this.section = name;
  }


}
