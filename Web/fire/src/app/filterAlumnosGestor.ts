import { Curso } from './curso';
import { Alumno } from './alumno';
import { Pipe, PipeTransform } from '@angular/core';
import { GestoresService } from './gestores.service';
import {Gestor} from './gestor';

@Pipe({
  name: 'FilterAlumnosGestor',
})
export class FilterAlumnosGestor implements PipeTransform {

  constructor(private gestoresService: GestoresService) {

  }

  transform(value: Alumno[], input: string) {
    const self = this;
    if (input) {
      return value.filter(function (element: Alumno) {
        return +element.Grado === +input;
      });
    }
    return [];
  }
}
