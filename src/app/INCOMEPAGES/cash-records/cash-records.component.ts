import { Component, OnInit } from '@angular/core';
import { SunamiserviceService } from '../../sunamiservice.service';
import { paymentRatesClass, paymentRatesClassPerClient } from '../../classes/paymentRates';
import { ToasterService, Toast } from 'angular2-toaster';
import { GeneralFilterPipe } from "app/general-filter.pipe";
import { UserServiceService } from '../../user-service.service';

@Component({
  selector: 'app-cash-records',
  templateUrl: './cash-records.component.html?v=${new Date().getTime()}',
  styleUrls: ['./cash-records.component.css?v=${new Date().getTime()}']
})
export class CashRecordsComponent implements OnInit {
  private data: any[];
  private filterQuery = "";
  private rowsOnPage = 100;
  private sum1: number = 0;
  public showlinkbutton = true;

  private payment: any[];
  private customer_ids: any[];
  private customer_id: string = "";
  private Code1: string = "";
  private amount = "";
  private date1 = "";

  private Fshowlinkbutton() {
    this.showlinkbutton = false;
  }

  private CANCEL() {
    //clear all fields
    this.showlinkbutton = true;
  }

  constructor(private _SunamiService: SunamiserviceService, private toasterService: ToasterService, private userservice: UserServiceService) {
   this.date1 = this.userservice.getdate();
   this._SunamiService.getActiveCustomersDetails().subscribe(
      (data) => this.createObj2(data), //Bind to view
      err => {
        // Log errors if any
        this.popToast("no internet", err);
      });
  }

  private createObj2(data2: any[]) {
    //this.customers = data2;
    this.customer_ids = [];
    for (let key in data2) {
      this.customer_ids.push(data2[key].Customer_id);
    }
  }

  private linkpayment() {
    this.payment = [];
    if (this.customer_id != null || this.customer_id != "") {
      this.payment.push({
        loggedUser: UserServiceService.email, PayMode: "cash",
        Customer_Id: this.customer_id, Code: this.Code1, amount: this.amount, date1: this.date1
      });
      this._SunamiService.postmakePayment(this.payment).subscribe(
        (data) => this.popToast("result", data), //Bind to view
        err => {
          // Log errors if any
          this.popToast("no internet", err);
        });
    }
    else {
      this.popToast("error!", "Please enter id number");
    }
    this.Code1 = "";
    this.showlinkbutton = true;
  }

  private popToast(t: string, b: string) {
    var toast: Toast = {
      type: 'error',
      title: t,
      body: b
    };

    this.toasterService.pop(toast);
  }

  ngOnInit() {
    this._SunamiService.getcashRecords().subscribe(
      (data) => this.allMpesaPayments(data),
      err => { console.log(err); }
    );

  }

  private allMpesaPayments(data1: any[]) {
    this.data = data1;
    this.calcSum();

  }



  private calcSum() {
    this.sum1 = 0;
    for (let key in this.data) {
      this.sum1 += parseInt(this.data[key].Amount);
    }
  }

  private changesum() {
    setTimeout(() => {
      this.sum1 = 0;
      for (let key in GeneralFilterPipe.filteredArray) {
        this.sum1 += parseInt(GeneralFilterPipe.filteredArray[key].Amount);
      }
    }, 1000)

  }

  private hideloader() {
    document.getElementById("loading").style.display = "none";
  }

  private exporttoexcel() {
    this.userservice.exporttoexcel(GeneralFilterPipe.filteredArray, "test1");
  }
}
