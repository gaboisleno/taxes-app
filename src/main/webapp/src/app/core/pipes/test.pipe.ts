import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'name', standalone: true })
export class NamePipe implements PipeTransform {
  transform(value: any): any {
    if (value.name) {
      return value.name;
    } else return value;
  }
}
