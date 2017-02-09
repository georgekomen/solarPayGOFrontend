import { Injectable } from '@angular/core';
import {Http,Response,Headers,RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SunamiserviceService {
  //mark:any[];
  constructor(private _http:Http) { 
   this.getMarkers();
  }

  getMarkers()
  {
   //ecdc
      
  }
}
//marker type
interface Imarker
{
  Customer_Name:string;
  Customer_Id:string;
  Customer_Lat:number;
  Customer_Lon:number;
  Customer_Status:boolean;
  Customer_Icon:string;
}
