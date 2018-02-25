import { Curso } from '../curso';
import { DialogComponent } from '../dialog/dialog.component';
import { Gestor } from '../gestor';
import { GestoresService } from '../gestores.service';
import { CursosService } from '../cursos.service';

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Index } from '@firebase/database/dist/esm/src/core/snap/indexes';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit {


  nuevoCurso: boolean;
  modificarCurso: boolean;
  cursosList: Curso[];
  gestoresList: Gestor[];
  gestoresListForSelect: Gestor[];
  filter: string;
  name: string;
  gestor: string;
  oldGestor: string;
  id: number;

  constructor(private gestoresService: GestoresService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public cursosService: CursosService) {
    this.nuevoCurso = false;
    this.modificarCurso = false;
    this.getList();
    this.name = '';
    this.gestor = '';
    this.oldGestor = '';
    this.id = -2;
    this.getListGestores();
   }

  // MODIFICAR VISIBILIDAD DE FORMULARIOS
  newCurso() {
    if (this.nuevoCurso) {
      this.nuevoCurso = false;
      this.name = '';
      this.gestor = '';
      this.id = -3;
    } else {
      this.name = '';
      this.gestor = '';
      this.id = -3;
      this.nuevoCurso = true;
      this.modificarCurso = false;
    }
  }

  modifyCurso(id: number, name: string, gestor: string) {
    if (this.modificarCurso) {
      this.modificarCurso = false;
      this.name = '';
      this.oldGestor = this.gestor = '';
      this.id = -4;
    } else {
      this.modificarCurso = true;
      this.nuevoCurso = false;
      this.name = name;
      this.oldGestor = this.gestor = gestor;
      this.id = id;

      console.log('gestor :' + this.gestor);
    }
  }

  getGestorName(uid: string) {
    return this.gestoresService.getGestorName(uid);
  }

  // SERVICIOS
  getList() {
    this.cursosList = this.cursosService.getList();
  }

  getListGestores() {
    this.gestoresListForSelect = this.gestoresList = this.gestoresService.getList();
  }

  addCurso() {
    this.cursosService.addCurso(this.name, this.gestor);
    this.openSnackBar(this.name + ' ha sido añadido con éxito!', 'OK');
    this.newCurso();
    }

  editCurso() {
    console.log('Gestor: ' + this.gestor);
    console.log('OldGestor: ' + this.oldGestor);
    this.cursosService.modifyCurso(this.id, this.name, this.gestor, this.oldGestor);
    this.modifyCurso(-4, '', '');
    this.openSnackBar(this.name + ' ha sido modificado con éxito!', 'OK');
  }

  deleteCurso(curso: Curso) {
    const dialog = this.dialog.open(DialogComponent, {
      data: {
        mensaje: '¿Está seguro de que desea eliminar el curso?',
        accion: 'Confirmar'
      }
    });

    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.cursosService.deleteCurso(curso);
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
