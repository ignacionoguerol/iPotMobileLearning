import { Component, OnInit } from '@angular/core';
import { ModulosService } from '../modulos.service';
import { GestoresService } from '../gestores.service';
import {Gestor} from '../gestor';

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

  constructor(private gestoresService: GestoresService, private modulosService: ModulosService) {
    this.modalidades = ['Ahorcado', 'Jeroglifico', 'Parejas', 'Preguntas', 'Puzzles', 'Sopa de Letras'];
    this.modulosList = [];
    this.getGestorActual();
  }

  ngOnInit() {
  }

  getGestorActual() {
    const self = this;
    this.gestoresService.loadGestor().subscribe( g => {
      self.gestor = JSON.parse(JSON.stringify(g));
      this.getList(self.gestor.curso);
    });
  }

  getList(curso: string) {
    this.modulosList = this.modulosService.getList();
  }
}
