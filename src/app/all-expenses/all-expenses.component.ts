import { Component, OnInit, Input, ViewChild, Renderer, ElementRef, ContentChildren } from '@angular/core';
import { SunamiserviceService } from '../sunamiservice.service';
import { paymentRatesClass, paymentRatesClassPerClient } from '../classes/paymentRates';
import { ToasterService, Toast } from 'angular2-toaster';
import { UserServiceService } from '../user-service.service';
import { GeneralFilterPipe } from '../general-filter.pipe';

@Component({
  selector: 'app-all-expenses',
  templateUrl: './all-expenses.component.html',
  styleUrls: ['./all-expenses.component.css']
})
export class AllExpensesComponent implements OnInit {
  data: any[];
  rowsOnPage = 100;
  filterQuery = "";
  sum1: number = 0;
  openModalWindow: boolean = false;
  imagePointer: any = 0;

  showlinkbutton = true;
  data1: any[];
  expense: any[] = [];
  category: string = "";
  amount: number;
  recepient: string = "";
  vendor: string = "";
  code: string = "";
  account: string = "";
  date1: string = "";
  OfficeMpesa = "Office Mpesa";
  EquityBank = "Equity Bank";
  OfficePettyCash = "Office Petty Cash";
  base64textString: String = "";
  userNames: any[];

  OpenImageModel(i: any) {
    this.openModalWindow = true;
    this.imagePointer = i;
  }

  cancelImageModel() {
    this.openModalWindow = false;
  }

  constructor(private _SunamiService: SunamiserviceService, private toasterService: ToasterService, private userservice: UserServiceService) {
    this.date1 = this.userservice.getdate();
  }

  ngOnInit() {
    this.getExpenses();

    this._SunamiService.getExpenseCategories().subscribe(
      (data) => this.data1 = data, //Bind to view
      err => {
        // Log errors if any
        this.popToast1("no internet", err);
      });

    this._SunamiService.getUserNames().subscribe(
      (data) => this.createObj1(data), //Bind to view
      err => {
        // Log errors if any
        this.popToast1("no internet", err);
      });
    this.hideloader();
  }

  createObj1(data1: any[]) {
    //this.searchData = data1;
    this.userNames = [];
    for (let key in data1) {
      this.userNames.push(data1[key].Name);
    }
  }

  getExpenses() {
    this._SunamiService.getAllExpenses().subscribe(
      (data) => this.calcSum(data), //Bind to view
      err => {
        // Log errors if any
        this.popToast("error", err, err);
      });
  }


  calcSum(data1: any) {
    this.data = data1
    this.sum1 = 0;
    for (let key in this.data) {
      try {
        this.sum1 += parseInt(this.data[key].Amount);
      }
      catch (error) {

      }
      console.log(this.sum1)
    }
  }

  hideloader() {
    document.getElementById("loading").style.display = "none";
  }

  showloader() {
    document.getElementById("loading").style.display = "initial";
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



  handleFileSelect(evt) {
    var files = evt.target.files;
    var file = files[0];
    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

   _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    //console.log(this.base64textString);
  }

   popToast1(t: string, b: string) {
    this.hideloader();
    this.getExpenses();
    var toast: Toast = {
      type: 'error',
      title: t,
      body: b
    };
    this.toasterService.pop(toast);
  }

   Fshowlinkbutton() {
    this.showlinkbutton = false;
  }

   CANCEL() {
    //clear all fields
    this.showlinkbutton = true;
  }

   submitData() {
    this.data = null;
    this.showloader();
    if (this.amount > 1 && this.recepient != "" && this.account != "" && this.date1 != "") {
      this.expense.push({ pic1: this.base64textString, category: this.category, amount: this.amount, recipient: this.recepient, dateset: this.date1, account: this.account, ref_code: this.code, recordedBy: UserServiceService.email, vendor: this.vendor });
      this._SunamiService.postExpense(this.expense).subscribe(
        (data) => this.popToast1("success", data.toString()), //Bind to view
        err => {
          // Log errors if any
          this.popToast1("no internet", err);
          this.hideloader();
        });
    }
    else {
      this.popToast1("error", "Fill all fields appropriately");
    }
    this.expense = [];
    this.showlinkbutton = true;
  }

   changesum() {
    setTimeout(() => {
      this.sum1 = 0;
      for (let key in GeneralFilterPipe.filteredArray) {
        this.sum1 += parseInt(GeneralFilterPipe.filteredArray[key].Amount);
      }
    }, 1000)
  }

   exporttoexcel() {
    this.userservice.exporttoexcel(GeneralFilterPipe.filteredArray, "test1");
  }

}
