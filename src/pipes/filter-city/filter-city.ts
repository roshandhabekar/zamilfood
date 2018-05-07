import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the FilterCityPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'filterCity',
})
export class FilterCityPipe implements PipeTransform {
  transform(dataarray: any, args?: any): Array<string> {

    if (args === undefined || args == '') {
      return dataarray;
    }
    else {
      let newVal = dataarray.filter((a: any, b: any) => {
        if (a.AvaiCityId.indexOf(args) != -1) {
          return 1;
        }
        else {
          return -1;
        }
      });
      return newVal;
    }
  }
}
