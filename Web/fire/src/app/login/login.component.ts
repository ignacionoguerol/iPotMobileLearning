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

  color: string;
  availableColors = [{ name: 'Warn', color: 'warn' }];

  constructor(private loginService: LoginService,  private router: Router) {}

  ngOnInit() {
  }

  login() {
    this.errorMessage = '';
    const self = this;
    this.error = this.loginService.emailLogin(this.email, this.pass);
    this.error.then(function() {
      self.router.navigateByUrl('/index');
    }).catch(function(error) {
      self.errorMessage = error.message;
    });
  }


}
