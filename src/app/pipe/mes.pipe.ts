import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mes'
})
export class MesPipe implements PipeTransform {

  transform(value: number, args?: any): string {
    if ((value + '').length === 1) {
      return '0' + value;
    }
    return value + '';
  }

}
