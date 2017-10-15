import { Component, OnInit } from '@angular/core';
import { SunamiserviceService } from '../sunamiservice.service';
import { paymentRatesClass, paymentRatesClassPerClient } from '../classes/paymentRates';
import { ToasterService, Toast } from 'angular2-toaster';
import { CompleterService, CompleterData } from 'ng2-completer';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { UserServiceService } from '../user-service.service';
import { GeneralFilterPipe } from '../general-filter.pipe';

@Component({
  selector: 'app-link-controller',
  templateUrl: './link-controller.component.html',
  styleUrls: ['./link-controller.component.css'],
  providers: [SunamiserviceService]
})
export class LinkControllerComponent implements OnInit {

  dataService: CompleterData;
  searchData: any[];
  customers: any[];
  imei: string = "";
  customer_id: string = "";
  controller: any[];
  data: any[];
  dataSwitch: any;
  filterQuery = "";
  rowsOnPage = 100;
  sortOrder = "asc";
  showlinkbutton = true;
  imeitoUnlink;
  showOptionsDiv: boolean = false;

  constructor(private completerService: CompleterService, private _SunamiService: SunamiserviceService, private toasterService: ToasterService,private userservice: UserServiceService) {

  }


  ngOnInit(): void {

    /*with delay
     this._SunamiService.getPaymentRates().subscribe((data:paymentRatesClass[])=> {
             setTimeout(()=> {
                 this.data = data;
             }, 6000);
         });*/

    this.getSytems();
    this._SunamiService.getFreeImei().subscribe(
      (data) => this.createObj1(data), //Bind to view
      err => {
        // Log errors if any
        this.popToast("no internet", err, this.data);
      });

    this._SunamiService.getCustomersWithNoController().subscribe(
      (data) => this.createObj2(data), //Bind to view
      err => {
        // Log errors if any
        this.popToast("no internet", err, this.data);
      });
  }

  getSytems() {
    this.data = null;
    this._SunamiService.getSystemDetails().subscribe(
      (data) => this.data = data, //Bind to view
      err => {
        // Log errors if any
        this.popToast("no internet", err, this.data);
      });
  }



  createObj1(data1: any[]) {
    //this.searchData = data1;
    this.searchData = [];
    for (let key in data1) {
      this.searchData.push(data1[key].FreeImei);
    }
  }

  createObj2(data2: any[]) {
    //this.customers = data2;
    this.customers = [];
    for (let key in data2) {
      this.customers.push(data2[key].Id);
    }
  }

  submit() {
    this.controller = [];
    if (this.imei.length > 10 && this.customer_id != "") {
      this.controller.push({ imei: this.imei, customer_id: this.customer_id, loogeduser: UserServiceService.email });
      this._SunamiService.postLinkController(this.controller).subscribe(
        (data) => this.popToastpost("results", data), //Bind to view
        err => {
          // Log errors if any
          this.popToast("no internet", err, this.data);
        });
    }
    else {
      this.popToast("error", "Fill all fields appropriately", this.data);
    }
    this.showlinkbutton = true;
  }

  Fshowlinkbutton() {
    this.showlinkbutton = false;
  }

  CANCEL(){
    //clear all fields
    this.showlinkbutton = true;
  }


  popToastpost(t: string, d: any[]) {
    var toast: Toast = {
      type: 'error',
      title: t,
      body: d
    };
    this.toasterService.pop(toast);
    //fetch new data afta registration
    this.getSytems();
  }


  popToast(t: string, b: string, d: any[]) {
    this.data = d;
    var toast: Toast = {
      type: 'error',
      title: t,
      body: b
    };
    this.toasterService.pop(toast);
  }

  popToast1(t: string, b: string) {
    var toast: Toast = {
      type: 'error',
      title: t,
      body: b
    };
    this.toasterService.pop(toast);
  }

  hideloader() {
    document.getElementById("loading").style.display = "none";
  }

  exporttoexcel() {
    this.userservice.exporttoexcel(GeneralFilterPipe.filteredArray, "test1");
  }

  unlink(){
    if(confirm(`are you sure you want to unlink this controller imei: ${this.imeitoUnlink}? this action is unreversable`)){
      this._SunamiService.unlinkController(this.imeitoUnlink).subscribe(res=>{
        this.showOptionsDiv = false;
        this.popToast1('Result', res);
      });
    } else {
      this.showOptionsDiv = false;

    }
  }

  setUnlink(value) {
    this.showOptionsDiv = true;
    this.imeitoUnlink = value;
  }

}
