import { Alumno } from './alumno';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'FilterAlumno',
  pure: false
})
export class FilterAlumno implements PipeTransform {
  transform(value: Alumno[], input: string) {
    if (input) {
      input = input.toLowerCase();
      return value.filter(function(element: Alumno) {
        return element.Nombre.toLowerCase().includes(input) || element.Email.toLowerCase().includes(input);
      });
    }
    return value;
  }
}
