import { Alumno } from './alumno';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'FilterAlumnosGestor',
  pure: false
})
export class FilterAlumnosGestor implements PipeTransform {
  transform(value: Alumno[], input: string) {
    if (input) {
      return value.filter(function (element: Alumno) {
        return +element.Grado === +input;
      });
    }
    return [];
  }
}
