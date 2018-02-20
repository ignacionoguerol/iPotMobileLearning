import { Curso } from './curso';
import { Pipe, PipeTransform } from '@angular/core';
import { GestoresService } from './gestores.service';

@Pipe({
    name: 'FilterCurso',
})
export class FilterCurso implements PipeTransform {

    constructor(private gestoresService: GestoresService) {

    }

    transform(value: Curso[], input: string) {
      const self = this;
        if (input) {
          input = input.toLowerCase();
          return value.filter(function(element: Curso) {
            return element.nombre.toLowerCase().includes(input) ||
              self.gestoresService.getGestorName(element.gestor).toLowerCase().includes(input);
          });
        }
        return value;
    }
}
