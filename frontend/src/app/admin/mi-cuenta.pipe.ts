import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'miCuenta'
})
export class MiCuentaPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
