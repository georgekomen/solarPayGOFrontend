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
  selector: 'app-uninstallations',
  templateUrl: './uninstallations.component.html',
  styleUrls: ['./uninstallations.component.css']
})
export class UninstallationsComponent implements OnInit {

  protected dataService: CompleterData;
  public customers: any[];
  imei: string = "";
  customer_id: string = "";
  uninstallarray: any[];
  public data: any[];
  public dataSwitch: any;
  public filterQuery = "";
  public rowsOnPage = 100;
  public sortOrder = "asc";
  public showlinkbutton = true;
  Reason: string = "";
  public date1: string = "";
  Payment: string="Payment issue";
  Connected: string = "Connected to grid";

  constructor(private completerService: CompleterService, private _SunamiService: SunamiserviceService, private toasterService: ToasterService,private userservice: UserServiceService) {
    this.date1 = this.userservice.getdate();
  }


  ngOnInit(): void {

    /*with delay
     this._SunamiService.getPaymentRates().subscribe((data:paymentRatesClass[])=> {
             setTimeout(()=> {
                 this.data = data;
             }, 6000);
         });*/

    this.getUninstalledSystems();

    this._SunamiService.getActiveCustomersDetails().subscribe(
      (data) => this.createObj2(data), //Bind to view
      err => {
        // Log errors if any
        this.popToast("no internet", err, this.data);
      });
  }

  getUninstalledSystems() {
    this.data = null;
    this._SunamiService.getUninstalledSystems().subscribe(
      (data) => this.data = data, //Bind to view
      err => {
        // Log errors if any
        this.popToast("no internet", err, this.data);
      });
  }

  createObj2(data2: any[]) {
    //this.customers = data2;
    this.customers = [];
    for (let key in data2) {
      this.customers.push(data2[key].id);
    }
  }

  public submit() {
    this.uninstallarray = [];
    if (this.customer_id.length > 4 && this.Reason.length > 5) {
      this.uninstallarray.push({ date1: this.date1, customer_id: this.customer_id, recorded_by: UserServiceService.email, reason: this.Reason });
      this._SunamiService.postUninstall(this.uninstallarray).subscribe(
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

  CANCEL() {
    //clear all fields
    this.showlinkbutton = true;
  }

  public popToastpost(t: string, d: any[]) {
    var toast: Toast = {
      type: 'error',
      title: t,
      body: d
    };
    this.toasterService.pop(toast);
    //fetch new data afta registration
    this.getUninstalledSystems();
  }


  public popToast(t: string, b: string, d: any[]) {
    this.data = d;
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

}
