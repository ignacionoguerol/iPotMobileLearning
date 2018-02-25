import { Gestor } from './gestor';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'FilterGestorNoAsignado',
})
export class FilterGestorNoAsignado implements PipeTransform {
    transform(value: Gestor[], input: Gestor) {
        console.log(value);
        console.log(input);
        if (input) {
          return value.filter(function(element: Gestor) {
            return element.curso === '';
          });
        }
        return value;
    }
}
