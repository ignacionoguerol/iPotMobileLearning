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
  password: string;
  filter: string;
  
  constructor(private gestoresService: GestoresService, public snackBar: MatSnackBar, public dialog: MatDialog) {
    this.nuevoGestor = false;
    this.modificarGestor = false;
    this.getList();
    this.name = '';
    this.email = '';
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

  modifyGestor(name: string, email: string) {
    if (this.modificarGestor) {
      this.modificarGestor = false;
      this.name = '';
    } else {
      this.modificarGestor = true;
      this.nuevoGestor = false;
      this.email = email;
      this.name = name;
    }
  }

  getList() {
    this.gestoresList = this.gestoresService.getList();
  }

  addGestor() {
    this.gestoresService.addGestor(this.name, this.email, '124wqerQWE');
    this.openSnackBar(this.name + ' añadido con éxtio!', '');
    this.name = '';
    this.email = '';
    this.password = '';
    this.newGestor();
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
        this.gestoresService.deleteGestor(uid);
        this.openSnackBar('Eliminado con éxito!', 'OK');
      }
    });
  }


  ngOnInit() {
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

}



