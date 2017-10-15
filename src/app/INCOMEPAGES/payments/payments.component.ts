import { Component, OnInit, Input, ViewChild, Renderer, ElementRef, ContentChildren } from '@angular/core';
import { SunamiserviceService } from '../../sunamiservice.service';
import { paymentRatesClass, paymentRatesClassPerClient } from '../../classes/paymentRates';
import { ToasterService, Toast } from 'angular2-toaster';
import { DataFilterPipe } from "app/data-filter.pipe";
import { DateFilterPipe } from "app/date-filter.pipe";
import { UserServiceService } from '../../user-service.service';
import { GeneralFilterPipe } from "app/general-filter.pipe";

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  //public data: paymentRatesClass[];
  data: customerPayDetails[];
  data3: customerPayDetails[];
  filterQuery = "";
  querydate1: Date;
  rowsOnPage = 100;
  sortBy = "";
  sortOrder = "asc";
  sumAmountDebt: number = 0;
  sumAmountInvoiced: number = 0;
  percent: string = "";
  state: string = '';
  openModalWindow: boolean = false;
  customer_id: any = "";
  debtAmount: number = 0;
  focusOnDebt: boolean = false;
  debtOrPaid: string = " paid";
  excludeactive: boolean = true;
  excludeinactive: boolean = true;
  invoiceItems: any[] = [];
  showOptionsDiv = false;
  currentlySelectedCustomer = '';
  showInvoiceCustomerDiv = false;
  isOnload: boolean = true;
  selectedInvoiceItem: any;
  invoiceDate;
  dateInterVals: any[] = [];


  constructor(private _SunamiService: SunamiserviceService, private toasterService: ToasterService, private userservice: UserServiceService, private _datefilter: DateFilterPipe) {

  }

  ngOnInit(): void {
    this.dateInterVals.push({startDate: '2016-01-01', endDate: this.userservice.getdate()});
    this.getPayRates();
    this.invoiceDate = this.userservice.getdate();
    this.getInvoiceItems();
  }

  getPayRates(){
    this._SunamiService.GetPaymentActiveRates(this.dateInterVals).subscribe(
      (data1) => {
        this.data = [];
        this.createdata(data1, "active");

        //after setting data for active customers now set for inactive customers
        this._SunamiService.GetPaymentInactiveRates(this.dateInterVals).subscribe(
          (data4) => {
            this.isOnload = true;
            this.createdata(data4, "inactive");
          },
          err => {
            // Log errors if any
            this.popToast("internet lost, some data was not loaded ", err);
          });

      }, //Bind to view
      err => {
        // Log errors if any
        this.popToast("no internet", err);
      });
  }

  OpenPayHistory() {
    this.showOptionsDiv = false;
    this.openModalWindow = true;
    this.customer_id = this.currentlySelectedCustomer;
  }

  cancelImageModel() {
    this.openModalWindow = false;
  }

  FshowInvoiceCustomerDiv() {
    this.showOptionsDiv = !this.showOptionsDiv;
    this.showInvoiceCustomerDiv = !this.showInvoiceCustomerDiv;
  }

  selectCustomerAndShowOptionsDiv(id: any) {
    this.currentlySelectedCustomer = id;
    this.openModalWindow = false;
    this.showOptionsDiv = true;
  }

  invoiceCustomer(value: any) {
    const customerName = this.data.find(t => t.Id === this.currentlySelectedCustomer).Name || '';
    if (confirm('are you sure you want to invoice ' + customerName + ' a ' + value)) {
      this._SunamiService.invoiceCustomer([{invoiceDate: this.invoiceDate, customerId: this.currentlySelectedCustomer, item: value, loogedUser: UserServiceService.email}]).subscribe(res => {
        this.popToast("Result", res);
      }, error2 => {
        this.popToast("Error", error2);
      });
    }
  }


  getInvoiceItems() {
    this._SunamiService.getInvoiceItems().subscribe(res => {
      this.invoiceItems = res;
    });
  }

  createdata(data1: any[], type: any) {
    for (let key in data1) {
      this.debtAmount = parseInt(data1[key].Invoice) - parseInt(data1[key].Amount);
      this.data.push({
        Id: data1[key].Id,
        Name: data1[key].Name,
        From: data1[key].From,
        Amount: data1[key].Amount,
        Invoice: data1[key].Invoice,
        Debt: this.debtAmount,
        Percent1: parseInt(((data1[key].Amount / data1[key].Invoice) * 100).toFixed(2)),
        To: data1[key].To,
        Comment: data1[key].Comment,
        Village: data1[key].Village,
        Phone: data1[key].Phone,
        Status: data1[key].Status,
        Active_status: type
      });
    }
    this.data.sort(function (a, b) { return (a.Percent1 > b.Percent1) ? 1 : ((b.Percent1 > a.Percent1) ? -1 : 0); });
    this.sortArrayPaid(this.data);

  }

  excludeInactive() {
    this.isOnload = true;
    this.excludeinactive = !this.excludeinactive;
    this.exxc();
  }

  excludeActive() {
    this.isOnload = true;
    this.excludeactive = !this.excludeactive;
    this.exxc();
  }

  exxc() {
    if (this.excludeinactive == true && this.excludeactive == false) {
      this.data3 = this.data.filter(f => f.Active_status == "active");
    }
    else if (this.excludeactive == true && this.excludeinactive == false) {
      this.data3 = this.data.filter(f => f.Active_status == "inactive");
    }
    else if (this.excludeinactive == true && this.excludeactive == true) {
      this.data3 = this.data;
    }
    else {
      this.data3 = [];
    }

    //redo calculations
    this.fc1();
  }

  focusChange() {
    this.focusOnDebt = !this.focusOnDebt;
    this.fc1();
  }

  fc1() {
    if (this.focusOnDebt == true) {

      this.debtOrPaid = " debt";
      this.sortArrayDebt(this.data3);
    }
    else {

      this.debtOrPaid = " paid";
      this.sortArrayPaid(this.data3);
    }
  }

  sortArrayDebt(data: any[]) {
    //create a new array
    //Amount, Invoice, Percent, To, Comment, Village, Phone, Status
    //sort the complex array
    this.sumAmountInvoiced = 0;
    this.sumAmountDebt = 0;
    for (let key in data) {
      this.sumAmountDebt += data[key].Debt;
      this.sumAmountInvoiced += data[key].Invoice;
      data[key].Percent1 = 100 - data[key].Percent1;
    }
    this.percent = ((100 * this.sumAmountDebt) / this.sumAmountInvoiced).toFixed(2);
    this.data3 = data;
  }



  sortArrayPaid(data: any[]) {
    this.sumAmountInvoiced = 0;
    this.sumAmountDebt = 0;
    for (let key in data) {

      //clear debt for inactive customers
      if (data[key].Active_status === 'inactive' && this.isOnload) {
        data[key].Debt = 0;
        data[key].Percent1 = 100;
        data[key].Invoice = data[key].Amount;
      }

      this.sumAmountDebt += data[key].Debt;
      this.sumAmountInvoiced += data[key].Invoice;
      if (!this.isOnload) {
        data[key].Percent1 = 100 - data[key].Percent1;
      }
    }
    this.percent = (100 * ((this.sumAmountInvoiced) - (this.sumAmountDebt)) / this.sumAmountInvoiced).toFixed(2);
    this.data3 = data;
    this.isOnload = false;
  }

  changesumgen() {
    if (this.focusOnDebt == true) {
      this.sumAmountDebt = 0;
      this.sumAmountInvoiced = 0;
      for (let key in GeneralFilterPipe.filteredArray) {
        this.sumAmountDebt += parseInt(GeneralFilterPipe.filteredArray[key].Debt);
        this.sumAmountInvoiced += parseInt(GeneralFilterPipe.filteredArray[key].Invoice);
      }
      this.percent = ((100 * this.sumAmountDebt) / this.sumAmountInvoiced).toFixed(2);
    }
    else if (this.focusOnDebt == false) {
      this.sumAmountDebt = 0;
      this.sumAmountInvoiced = 0;
      for (let key in GeneralFilterPipe.filteredArray) {
        this.sumAmountDebt += parseInt(GeneralFilterPipe.filteredArray[key].Debt);
        this.sumAmountInvoiced += parseInt(GeneralFilterPipe.filteredArray[key].Invoice);
      }
      this.percent = (100 * ((this.sumAmountInvoiced) - (this.sumAmountDebt)) / this.sumAmountInvoiced).toFixed(2);
    }
  }

  changesumdata() {
    if (this.focusOnDebt == true) {
      this.sumAmountDebt = 0;
      this.sumAmountInvoiced = 0;
      for (let key in DataFilterPipe.filteredArray) {
        this.sumAmountDebt += parseInt(DataFilterPipe.filteredArray[key].Amount);
        this.sumAmountInvoiced += parseInt(DataFilterPipe.filteredArray[key].Invoice);
      }
      this.percent = ((100 * this.sumAmountDebt) / this.sumAmountInvoiced).toFixed(2);
    }
    else if (this.focusOnDebt == false) {
      this.sumAmountDebt = 0;
      this.sumAmountInvoiced = 0;
      for (let key in DataFilterPipe.filteredArray) {
        this.sumAmountDebt += parseInt(DataFilterPipe.filteredArray[key].Amount);
        this.sumAmountInvoiced += parseInt(DataFilterPipe.filteredArray[key].Invoice);
      }
      this.percent = (100 * ((this.sumAmountInvoiced) - (this.sumAmountDebt)) / this.sumAmountInvoiced).toFixed(2);
    }
  }


  filterbydate() {
    this.data3 = this.data.filter(f => f.From >= this.querydate1);
    //this.data = this._datefilter.transform(this.data, this.dates1);
  }

  switch1(d: any) {
    this.popToast("Results", d);
  }

  toggleSwitch(k1: string) {
    this._SunamiService.getSwitch(k1, UserServiceService.email).subscribe(
      (dataSwitch) => this.switch1(dataSwitch), //Bind to view
      err => {
        // Log errors if any
        this.popToast("Results", err);
      });
  }

  toInt(num: string) {
    return +num;
  }

  sortByWordLength = (a: any) => {
    return a.Comment.length;
  }

  hideloader() {
    document.getElementById("loading").style.display = "none";
  }

  showloader() {
    document.getElementById("loading").style.display = "initial";
  }

  popToast(t: string, b: string) {
    var toast: Toast = {
      type: 'error',
      title: t,
      body: b
    };
    this.toasterService.pop(toast);
  }

  exporttoexcel() {
    this.userservice.exporttoexcel(DataFilterPipe.filteredArray, "test1");
  }
}

interface customerPayDetails {
  Id: string,
  Name: string,
  From: Date,
  Amount: number,
  Invoice: number,
  Debt: number,
  Percent1: number,
  To: Date,
  Comment: string,
  Village: string,
  Phone: string,
  Status: string,
  Active_status: string
}
