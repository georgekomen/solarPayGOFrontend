import { Component, OnInit } from '@angular/core';
import { SunamiserviceService } from '../../sunamiservice.service';
import { paymentRatesClass, paymentRatesClassPerClient } from '../../classes/paymentRates';
import { ToasterService, Toast } from 'angular2-toaster';
import { GeneralFilterPipe } from "app/general-filter.pipe";
import { UserServiceService } from '../../user-service.service';

@Component({
  selector: 'app-bank-records',
  templateUrl: './bank-records.component.html',
  styleUrls: ['./bank-records.component.css']
})
export class BankRecordsComponent implements OnInit {
  data: any[];
  filterQuery = "";
  rowsOnPage = 100;
  sum1: number = 0;
  showlinkbutton = true;

  payment: any[];
  customer_ids: any[];
  customer_id: string = "";
  Code1: string = "";
  amount = "";
  date1 = "";
  bankname = "";
  banknames = ["Equity", "KCB", "Co-op"];
  idToDelete;
  showOptionsDiv: boolean = false;
  paymentName;
  Fshowlinkbutton() {
    this.showlinkbutton = false;
  }

  CANCEL() {
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

  createObj2(data2: any[]) {
    //this.customers = data2;
    this.customer_ids = [];
    for (let key in data2) {
      this.customer_ids.push(data2[key].Customer_id);
    }
  }

  linkpayment() {
    this.payment = [];
    if (this.customer_id != null || this.customer_id != "") {
      this.payment.push({
        loggedUser: UserServiceService.email, PayMode: "bank",bankname:this.bankname,
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

  popToast(t: string, b: string) {
    var toast: Toast = {
      type: 'error',
      title: t,
      body: b
    };

    this.toasterService.pop(toast);
  }

  ngOnInit() {
    this._SunamiService.getbankRecords().subscribe(
      (data) => this.allMpesaPayments(data),
      err => { console.log(err); }
    );

  }

  allMpesaPayments(data1: any[]) {
    this.data = data1;
    this.calcSum();

  }



  calcSum() {
    this.sum1 = 0;
    for (let key in this.data) {
      this.sum1 += parseInt(this.data[key].Amount);
    }
  }

  changesum() {
    setTimeout(() => {
      this.sum1 = 0;
      for (let key in GeneralFilterPipe.filteredArray) {
        this.sum1 += parseInt(GeneralFilterPipe.filteredArray[key].Amount);
      }
    }, 1000)

  }

  hideloader() {
    document.getElementById("loading").style.display = "none";
  }

  exporttoexcel() {
    this.userservice.exporttoexcel(GeneralFilterPipe.filteredArray, "test1");
  }


  deleteRecord() {
    if (confirm(`are you sure you want to delete this payment linked to: ${this.paymentName}? this action is unreversable`)) {
      this._SunamiService.deletePayment(this.idToDelete).subscribe(res => {
        this.showOptionsDiv = false;
        this.popToast('Result', res);
      });
    } else {
      this.showOptionsDiv = false;

    }
  }

  setIdToDelete(value,name) {
    this.showOptionsDiv = true;
    this.idToDelete = value;
    this.paymentName = name;
  }
}
