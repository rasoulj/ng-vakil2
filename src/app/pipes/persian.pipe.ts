import { Pipe, PipeTransform } from '@angular/core';

import { fa } from './lang/fa';

@Pipe({
  name: 'persian',
})
export class PersianPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return PersianPipe.toPersian(value);
  }

  static toPersian(value: string): string {
    return fa[value] ?? value;
  }
}
