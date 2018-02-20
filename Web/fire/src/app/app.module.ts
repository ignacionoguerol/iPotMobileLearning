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
import { GestoresComponent } from './gestores/gestores.component';

// Angular Material
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';

// Pipes
import { FilterGestor } from './filterGestorPipe';
import { FilterCurso } from './filterCursoPipe';

// Services
import { LoginService } from './login.service';
import { GestoresService } from './gestores.service';
import { DialogComponent } from './dialog/dialog.component';
import { CursosComponent } from './cursos/cursos.component';
import { CursosService } from './cursos.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    GestoresComponent,
    FilterGestor,
    FilterCurso,
    DialogComponent,
    CursosComponent,
    ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatChipsModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    MatTabsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSelectModule
  ],
  providers: [
    LoginService,
    GestoresService,
    CursosService
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    DialogComponent
    ]
})
export class AppModule { }
