import * as _ from "lodash";
import { Pipe, PipeTransform } from "@angular/core";
import { PaymentsComponent } from "app/INCOMEPAGES/payments/payments.component";

@Pipe({
    name: "dataFilter"
})
export class DataFilterPipe implements PipeTransform {
    private len: number;
    public static filteredArray:any[];

    transform(array: any[], query: any): any {

        if (query == "") {
            DataFilterPipe.filteredArray = array;
        }

        /*if (query.startsWith("Name")) {
            this.len = query.length;
            query = query.slice(4, this.len);
            if (query.toUpperCase()) {
                DataFilterPipe.filteredArray = _.filter(array, row => row.Name.indexOf(query.toUpperCase()) > -1);
            }
            
        }*/

        if (query.startsWith("PayRate")) {
            this.len = query.length;
            query = query.slice(7, this.len);
            if (query) {
                DataFilterPipe.filteredArray = _.filter(array, row => row.Percent <= query);
            }
            
        }
        return DataFilterPipe.filteredArray;
    }
}