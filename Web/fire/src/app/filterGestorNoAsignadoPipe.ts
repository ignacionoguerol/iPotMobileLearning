import { Gestor } from './gestor';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'FilterGestorNoAsignado',
})
export class FilterGestorNoAsignado implements PipeTransform {
    transform(value: Gestor[], input: Gestor) {
        if (input) {
          return value.filter(function(element: Gestor) {
            return element.curso === '';
          });
        }
        return value;
    }
}
