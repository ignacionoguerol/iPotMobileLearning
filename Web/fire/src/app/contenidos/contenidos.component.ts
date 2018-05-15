import { Component, OnInit } from '@angular/core';
import { ModulosService } from '../modulos.service';
import { GestoresService } from '../gestores.service';
import { ContenidosService } from '../contenidos.service';
import { CursosService } from '../cursos.service';
import { Gestor } from '../gestor';
import { Curso } from '../curso';
import { Ahorcado } from '../modalidades/ahorcado';
import { Jeroglifico } from '../modalidades/jeroglifico';
import { Observable } from 'rxjs/Observable';
import { AngularFireUploadTask } from 'angularfire2/storage';
import { Parejas } from '../modalidades/parejas';
import { Pregunta } from '../modalidades/pregunta';
import { Puzzle } from '../modalidades/Puzzle';
import { Palabra } from '../modalidades/palabra';
import {Sopa} from '../modalidades/sopa';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component';

@Component({
  selector: 'app-contenidos',
  templateUrl: './contenidos.component.html',
  styleUrls: ['./contenidos.component.scss']
})
export class ContenidosComponent implements OnInit {

  filter: string;
  contenidosList: String[];
  modalidades: String[];
  gestor: Gestor;
  modulosList: String[];
  modalidad: String;
  modulo: String;
  curso: Curso;
  add: boolean;
  respuesta: string;
  palabra: Palabra;
  ahorcado: Ahorcado;
  jeroglifico: Jeroglifico;
  parejas: Parejas;
  pregunta: Pregunta;
  puzzle: Puzzle;
  sopa: Sopa;

  selectedFiles: FileList | null;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;

  constructor(private gestoresService: GestoresService, private modulosService: ModulosService,
              private contenidosService: ContenidosService, private cursosService: CursosService,
              public snackBar: MatSnackBar, public dialog: MatDialog) {
    this.modalidades = ['Ahorcado', 'Jeroglifico', 'Parejas', 'Preguntas', 'Puzzles', 'Sopa'];
    this.modulosList = [];
    this.getGestorActual();
    this.modalidad = '';
    this.modulo = '';
    this.contenidosList = [];
    this.add = false;
    this.clear();
    this.respuesta = '';
    this.palabra = new Palabra();
  }

  ngOnInit() {
  }

  addElement() {
    if (this.add) {
      this.add = false;
      this.clear();
    } else {
      this.add = true;
    }
  }

  aniadirElemento() {
    switch (this.modalidad) {
      case 'Ahorcado': {
        this.contenidosService.add(this.curso.nombre, this.modalidad, this.modulo, this.ahorcado).then(ret => {
          this.clear();
        });
        break;
      }
      case 'Jeroglifico': {
        this.contenidosService.add(this.curso.nombre, this.modalidad, this.modulo, this.jeroglifico).then(ret => {
          this.clear();
          this.uploadProgress = null;
          // document.getElementById('input').value = '';
        });
        break;
      }
      case 'Parejas': {
        this.contenidosService.add(this.curso.nombre, this.modalidad, this.modulo, this.parejas).then(ret => {
          this.clear();
        });
        break;
      }
      case 'Preguntas': {
        this.contenidosService.add(this.curso.nombre, this.modalidad, this.modulo, this.pregunta).then(ret => {
          this.clear();
        });
        break;
      }
      case 'Puzzles': {
        this.contenidosService.add(this.curso.nombre, this.modalidad, this.modulo, this.puzzle).then(ret => {
          this.clear();
        });
        break;
      }
      case 'Sopa': {
        this.contenidosService.add(this.curso.nombre, this.modalidad, this.modulo, this.sopa).then(ret => {
          this.clear();
        });
        break;
      }
    }
  }

  addRespuesta() {

      switch (this.modalidad) {
        case 'Preguntas': {
          if (this.respuesta.length > 0) {
            this.pregunta.respuestas.push(this.respuesta);
            this.respuesta = '';
          }
          break;
        }
        case 'Puzzles': {
          if (this.palabra.orden !== '' && this.palabra.id !== '') {
            this.puzzle.palabras.push(this.palabra);
            this.palabra = new Palabra();
          }
          break;
        }
        case 'Sopa': {
          if (this.respuesta.length > 0) {
            this.sopa.palabras.push(this.respuesta);
            this.respuesta = '';
          }
        }
      }

  }

  getGestorActual() {
    const self = this;
    this.gestoresService.loadGestor().subscribe( g => {
      self.gestor = JSON.parse(JSON.stringify(g));
      this.getList(self.gestor.curso);
      this.getNombreCurso(self.gestor.curso);
    });
  }

  getList(curso: string) {
    this.modulosList = this.modulosService.getList();
  }

  getNombreCurso(id: String) {
    const self = this;
    this.cursosService.getCurso(id).subscribe(curso => {
      self.curso = JSON.parse(JSON.stringify(curso));
    });
  }

  getContenidos() {
    this.contenidosService.loadList(this.curso.nombre, this.modalidad, this.modulo).subscribe(contenidos => {
      this.contenidosList = [];
      contenidos.forEach( contenido => {
        this.contenidosList.push(JSON.parse(JSON.stringify(contenido)));
      });
      console.log(this.contenidosList);
    });
  }

  clear() {
    this.ahorcado = new Ahorcado();
    this.jeroglifico = new Jeroglifico();
    this.parejas = new Parejas();
    this.pregunta = new Pregunta();
    this.puzzle = new Puzzle();
    this.sopa = new Sopa();
  }

  cambiarModalidad() {
    this.contenidosList = [];
  }

  detectFiles($event: Event) {
    this.selectedFiles = ($event.target as HTMLInputElement).files;
  }

  upload(event) {
    this.task = this.contenidosService.upload(event, 'Jeroglificos' + this.curso.nombre
      + '/' + this.modulo + '/' + event.target.files[0].name);
    this.uploadProgress = this.task.percentageChanges();
    this.task.then(uploaded => {
      this.jeroglifico.url = uploaded.downloadURL;
    });
  }

  delete(id: String) {
    const dialog = this.dialog.open(DialogComponent, {
      data: {
        mensaje: '¿Está seguro de que desea eliminar el elemento ' + id + '?',
        accion: 'Confirmar'
      }
    });

    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.contenidosService.delete(this.curso.nombre, this.modalidad, this.modulo, id).then(resp => {
          this.openSnackBar('Eliminado con éxito', 'OK');
        });

      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }
}
