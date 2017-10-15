import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "mpesaFilter"
})
export class MpesaFilterPipe implements PipeTransform
{
     len:number;
    transform(array: any[], query: any): any {

    if(query==""){
        return array;
    }

   if(query.startsWith("Date")){
       this.len=query.length;
       query = query.slice(4,this.len);
        if (query) {
            return _.filter(array, row=>row.Date.indexOf(query) > -1);
        }
        return array;
    }

    if(query.startsWith("Number")){
        this.len=query.length;
        query = query.slice(6,this.len);
        if (query.toUpperCase()) {
            return _.filter(array, row=>row.Number.indexOf(query.toUpperCase()) > -1);
        }
        return array;
    }

    if(query.startsWith("Code")){
        this.len=query.length;
        query = query.slice(4,this.len);
        if (query) {
            return _.filter(array, row=>row.Reference.indexOf(query.toUpperCase()) > -1);
        }
        return array;
    }

    if(query.startsWith("Amount")){
        this.len=query.length;
        query = query.slice(6,this.len);
        if (query.toUpperCase()) {
            return _.filter(array, row=>row.Amount.indexOf(query.toUpperCase()) > -1);
        }
        return array;
    }

    if(query.startsWith("Message")){
        this.len=query.length;
        query = query.slice(7,this.len);
        if (query.toUpperCase()) {
            return _.filter(array, row=>row.Message.indexOf(query.toUpperCase()) > -1);
        }
        return array;
    }

    }
}
