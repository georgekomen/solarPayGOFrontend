import * as _ from "lodash";
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'generalFilter'
})
export class GeneralFilterPipe implements PipeTransform {
    private val: string = "";
    public static filteredArray: any[];

    transform(array: any[], query: any): any {

        /*if (query == "") {
          return array;
        }
        if (query) {
          return _.filter(array, row => row.all.indexOf(query) > -1);
        }
        return array;*/

        var resultArray = [];
        if (query.length === 0) {
            resultArray = array;
        }
        else {
            for (let item of array) {
                this.val = JSON.stringify(item);
                //console.log(this.val);
                if (this.val != null && this.val.match(new RegExp('' + query, 'i'))) {
                    resultArray.push(item);
                }
            }
        }
        GeneralFilterPipe.filteredArray = resultArray;
        return GeneralFilterPipe.filteredArray;
    }
}


/*import {Injectable, Pipe} from 'angular2/core';
@Pipe({
    name: 'myfilter'
})
@Injectable()
export class MyFilterPipe implements PipeTransform {
    transform(items: any[], args: any[]): any {
        return items.filter(item => item.id.indexOf(args[0]) !== -1);
    }
}*/