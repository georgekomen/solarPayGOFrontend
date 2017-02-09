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

  getMarkers(): Observable<Imarker[]>
  {
   const headers: Headers = new Headers();
   headers.append('Accept', 'application/json');
   headers.append('Content-Type', 'application/json');
   headers.append('Access-Control-Allow-Origin', '*');

   const options = new RequestOptions({
     headers: headers
   });


     return this._http.get('http://api.sunamiapp.net/api/customers/',options)
     .map((res:Response) => res.json())
                         //...errors if any
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
      
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
