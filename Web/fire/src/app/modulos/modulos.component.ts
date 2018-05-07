import { Component, OnInit } from '@angular/core';
import {Gestor} from '../gestor';
import { GestoresService } from '../gestores.service';
import { ModulosService } from '../modulos.service';
import { CursosService } from '../cursos.service';
import { Curso } from '../curso';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Modulo } from '../modulo';
import { MatDialog } from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component';

@Component({
  selector: 'app-modulos',
  templateUrl: './modulos.component.html',
  styleUrls: ['./modulos.component.scss']
})
export class ModulosComponent implements OnInit {

  filter: string;
  modulosList: String[];
  gestor: Gestor;
  nuevoModulo: boolean;
  modificarModulo: boolean;
  curso: Curso;
  modulo: Modulo;

  constructor(private gestoresService: GestoresService, private modulosService: ModulosService,
              private cursosService: CursosService, public snackBar: MatSnackBar, public dialog: MatDialog) {
    this.nuevoModulo = false;
    this.modificarModulo = false;
    this.filter = '';
    this.modulosList = [];
    this.getGestorActual();
    this.modulo = new Modulo();
    this.modulo.enabled = false;
  }

  ngOnInit() {
  }

  getGestorActual() {
    const self = this;
    this.gestoresService.loadGestor().subscribe( g => {
      self.gestor = JSON.parse(JSON.stringify(g));
      this.getList(self.gestor.curso);
      this.getNombreCurso(self.gestor.curso);
    });
  }

  newModulo( ) {
    if (this.nuevoModulo) {
      this.nuevoModulo = false;
    } else {
      this.nuevoModulo = true;
    }
  }

  modifyModulo(name: string, id: number, enabled: boolean){
    if (this.modificarModulo) {
      this.modificarModulo = false;
      this.modulo = new Modulo();
      this.modulo.enabled = false;
    } else {
      this.modificarModulo = true;
      this.modulo.enabled = enabled;
      this.modulo.id = id;
      this.modulo.name = name;
    }
  }

  addModulo() {
    this.modulosService.addModulo(this.curso.id, this.modulo)
      .then(ret => this.openSnackBar('Módulo añadido correctamente!', 'OK'));
    this.newModulo();
    this.modulo = new Modulo();
  }

  updateModulo() {
    this.modulosService.modifyModulo(this.curso.id, this.modulo)
      .then(ret => this.openSnackBar('Módulo modificado correctamente!', 'OK'));
    this.modifyModulo('', null, false);
  }
  
  deleteModulo(id: number) {
    const dialog = this.dialog.open(DialogComponent, {
      data: {
        mensaje: '¿Está seguro de que desea eliminar este módulo?',
        accion: 'Confirmar'
      }
    });

    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.modulosService.deleteModulo(this.curso.id, id)
          .then(ret => this.openSnackBar('Módulo eliminado correctamente!', 'OK'));
      }
    });
  }

  getList(curso: string) {
    this.modulosService.loadList(curso);
    this.modulosList = this.modulosService.getList();
  }

  getNombreCurso(id: String) {
    const self = this;
    this.cursosService.getCurso(id).subscribe(curso => {
      self.curso = JSON.parse(JSON.stringify(curso));
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }
}
