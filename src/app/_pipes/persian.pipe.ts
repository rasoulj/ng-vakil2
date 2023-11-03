import { Pipe, PipeTransform } from '@angular/core';

import { fa } from './lang/fa';

@Pipe({
  name: 'persian',
})
export class PersianPipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {
    return PersianPipe.toPersianArgs(value, args);
  }

  static toPersianArgs(value: string, args: string[]): string {
    let pr = PersianPipe.toPersian(value);
    for (let i = 0; i < args.length; i++) {
      pr = pr.replaceAll(`{${i}}`, args[0]);
    }
    return pr;
  }

  static toPersian(value: string): string {
    return fa[value] ?? value;
  }
}
