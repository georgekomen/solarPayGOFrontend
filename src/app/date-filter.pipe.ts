import { Pipe, PipeTransform } from '@angular/core';
import * as _ from "lodash";

@Pipe({
  name: 'dateFilter'
})
export class DateFilterPipe implements PipeTransform {
  transform(array: any[], query: Date[]) {
    if (query==null) {
      return array;
    }

    else if (query!=null) {
      return _.filter(array, row => row.From >= query[0]);
    }
  }

}
