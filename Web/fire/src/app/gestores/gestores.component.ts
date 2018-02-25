import { DialogComponent } from '../dialog/dialog.component';
import { Gestor } from '../gestor';
import { Component, OnInit } from '@angular/core';
import { GestoresService } from '../gestores.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Data } from '@angular/router';
import { User } from 'firebase';
import { Observable } from 'rxjs/';
import { filter } from 'rxjs/operators';
import { HttpResponse } from 'selenium-webdriver/http';
import { LoginService } from '../login.service';

/**
 * @title Snack-bar with a custom component
 */

@Component({
  selector: 'app-gestores',
  templateUrl: './gestores.component.html',
  styleUrls: ['./gestores.component.scss']
})
export class GestoresComponent implements OnInit {

  nuevoGestor: boolean;
  modificarGestor: boolean;
  gestoresList: Gestor[];
  name: string;
  email: string;
  filter: string;
  uid: string;
  loading: boolean;
  tooltipPosition: string;

  constructor(private gestoresService: GestoresService, public snackBar: MatSnackBar, public dialog: MatDialog) {
    this.nuevoGestor = false;
    this.modificarGestor = false;
    this.getList();
    this.name = '';
    this.email = '';
    this.uid = '';
    this.loading = false;
    this.tooltipPosition = 'right';
   }

  newGestor() {
    if (this.nuevoGestor) {
      this.nuevoGestor = false;
    } else {
      this.nuevoGestor = true;
      this.modificarGestor = false;
      this.email = '';
      this.name = '';
    }
  }

  modifyGestor(uid: string, name: string, email: string) {
    if (this.modificarGestor) {
      this.modificarGestor = false;
      this.name = '';
      this.email = '';
      this.uid = '';
    } else {
      this.modificarGestor = true;
      this.nuevoGestor = false;
      this.name = name;
      this.email = email;
      this.uid = uid;
    }
  }

  getList() {
    this.gestoresList = this.gestoresService.getList();
  }

  addGestor() {
    this.loading = true;
    this.gestoresService.addGestor(this.name, this.email).subscribe(res => {
      this.openSnackBar(this.name + ' añadido con éxito!', '');
      }
    );

    this.name = '';
    this.email = '';
    this.newGestor();
    this.loading = false;
    }

  deleteGestor(uid: string) {
    const dialog = this.dialog.open(DialogComponent, {
      data: {
        mensaje: '¿Está seguro de que desea eliminar el gestor?',
        accion: 'Confirmar'
      }
    });

    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.gestoresService.deleteGestor(uid).subscribe(resp => console.log(resp));
        this.openSnackBar('Eliminado con éxito!', 'OK');
      }
    });
  }

  updateGestor() {
    console.log('update ' + this.uid + ' nombre: ' + this.name);
    this.gestoresService.modificarGestor(this.uid, this.name).then(result => {
        this.openSnackBar('Modificado con éxito!', 'OK');
        this.uid = '';
        this.modifyGestor('', '', '');
      });
  }


  ngOnInit() {
  }

  isValidMailFormat() {
    const EMAIL_REGEXP = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    return EMAIL_REGEXP.test(this.email);
  }

  itsMe(email: string) {
    return this.gestoresService.istMe(email);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

}



