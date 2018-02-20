import { Gestor } from './gestor';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'FilterGestor',
})
export class FilterGestor implements PipeTransform {
    transform(value: Gestor[], input: string) {
        if (input) {
          input = input.toLowerCase();
          return value.filter(function(element: Gestor) {
            return element.nombre.toLowerCase().includes(input) || element.email.toLowerCase().includes(input);
          });
        }
        return value;
    }
}
