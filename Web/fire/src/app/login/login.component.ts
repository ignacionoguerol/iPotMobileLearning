import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  currentUser: User;
  email = '';
  pass = '';
  error: Promise<void | Error>;
  errorMessage;
  entrar: boolean;
  loading: boolean;

  color: string;
  availableColors = [{ name: 'Warn', color: 'warn' }];

  constructor(private loginService: LoginService,  private router: Router) {
    this.entrar = false;
    this.loading = false;
  }

  ngOnInit() {
  }

  login() {
    this.errorMessage = '';
    const self = this;
    this.loading = true;
    this.error = this.loginService.emailLogin(this.email, this.pass);
    this.error.then(function() {
      self.router.navigateByUrl('/index');
      self.loading = false;
    }).catch(function(error) {
      self.loading = false;
      self.errorMessage = error.message;

    });
  }

  click() {
    if (this.entrar) {
      this.entrar = false;
    } else {
      this.entrar = true;
    }
  }





}
