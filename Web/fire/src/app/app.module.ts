import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
export const firebaseConfig = environment.firebaseConfig;

// Components
import { LoginComponent } from './login/login.component';


// Material
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/';
import { MatSidenavModule } from '@angular/material/sidenav';

// Services
import { LoginService } from './login.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    NoopAnimationsModule,
    FormsModule,
    MatChipsModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule
  ],
  providers: [
    LoginService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
