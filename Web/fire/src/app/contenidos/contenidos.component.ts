import { Component, OnInit } from '@angular/core';
import { ModulosService } from '../modulos.service';
import { GestoresService } from '../gestores.service';
import { ContenidosService } from '../contenidos.service';
import { CursosService } from '../cursos.service';
import { Gestor } from '../gestor';
import { Curso } from '../curso';

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

  constructor(private gestoresService: GestoresService, private modulosService: ModulosService,
              private contenidosService: ContenidosService, private cursosService: CursosService) {
    this.modalidades = ['Ahorcado', 'Jeroglifico', 'Parejas', 'Preguntas', 'Puzzles', 'Sopa'];
    this.modulosList = [];
    this.getGestorActual();
    this.modalidad = '';
    this.modulo = '';
    this.contenidosList = [];
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
    this.contenidosList = [];
    this.contenidosService.loadList(this.curso.nombre, this.modalidad, this.modulo).subscribe(contenidos => {
      contenidos.forEach( contenido => {
        this.contenidosList.push(JSON.parse(JSON.stringify(contenido)));
      });
      console.log(this.contenidosList);
    });
  }
}
