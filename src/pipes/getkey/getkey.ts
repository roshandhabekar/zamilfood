import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the GetkeyPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'getKeys',
})
export class GetkeyPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  constructor() {}
  transform(value, args:string[]) : any {
    let keys = [];
    for (let key in value) {
      keys.push(key);
    }
    return keys;
  }
}
