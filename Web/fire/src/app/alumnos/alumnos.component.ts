import { Component, OnInit } from '@angular/core';
import { AlumnosService } from '../alumnos.service';
import { Alumno } from '../alumno';
@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})

export class AlumnosComponent implements OnInit {

  alumnosList: Alumno[];

  constructor(private alumnosService: AlumnosService) {
    this.getList();
  }

  ngOnInit() {
  }

  getList() {
    this.alumnosList = this.alumnosService.getList();
  }

}
