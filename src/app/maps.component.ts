import { Component, OnInit } from '@angular/core';
import {SunamiserviceService} from './sunamiservice.service';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css'],
  providers: [SunamiserviceService]
})

export class MapsComponent {
 //zoom level
  zoom: number = 10;
  Customer_Lat: number = -4;
  Customer_Lon: number = 39;
  //markers//--0
  customers: Imarker[];//--0

  constructor(private _SunamiService:SunamiserviceService)
  {
     this.createMarkers();
  }

  createMarkers(){
    this._SunamiService.getMarkers().subscribe(
        customersRead =>  this.customers = customersRead, //Bind to view
        err => {
        // Log errors if any
        console.log(err);
      });

  }

  clickedMarker(marker:Imarker,index:number){
    console.log('clicked marker: '+marker.Customer_Name+' at index '+index)
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