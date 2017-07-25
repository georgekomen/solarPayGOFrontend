import { Component, OnInit } from '@angular/core';
import { SunamiserviceService } from '../sunamiservice.service';
import { paymentRatesClass, paymentRatesClassPerClient } from '../classes/paymentRates';
import { ToasterService, Toast } from 'angular2-toaster';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})

export class MapsComponent {
  //zoom level
  zoom: number = 10;
  Customer_Lat: number = -3.9;
  Customer_Lon: number = 39.7;
  //markers//--0
  customers: any[];//--0

  constructor(private _SunamiService: SunamiserviceService, private toasterService: ToasterService) {
    this.createMarkers();
  }

  popToast(t: string, b: string) {
    var toast: Toast = {
      type: 'error',
      title: t,
      body: b
    };

    this.toasterService.pop(toast);
  }

  createMarkers() {
    this._SunamiService.getCustomerLocations().subscribe(
      (customersRead: any[]) => this.customers = customersRead, //Bind to view
      err => {
        // Log errors if any
        this.popToast("no internet", err);
      });
  }


  clickedMarker(marker: any, index: number) {
    console.log('clicked marker: ' + marker.Customer_Name + ' at index ' + index)
  }

  public hideloader() {
    document.getElementById("loading").style.display = "none";
  }
}

//marker type
interface Imarker {
  Customer_Name: string;
  Customer_Id: string;
  Customer_Lat: number;
  Customer_Lon: number;
  Customer_Status: boolean;
  Customer_Icon: string;
}