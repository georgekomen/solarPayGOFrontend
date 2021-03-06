import { Component, OnInit } from '@angular/core';
import { SunamiserviceService } from '../../sunamiservice.service';
import { paymentRatesClass, paymentRatesClassPerClient } from '../../classes/paymentRates';
import { ToasterService, Toast } from 'angular2-toaster';
import { GeneralFilterPipe } from "app/general-filter.pipe";
import { UserServiceService } from '../../user-service.service';

@Component({
  selector: 'app-cash-records',
  templateUrl: './cash-records.component.html',
  styleUrls: ['./cash-records.component.css']
})
export class CashRecordsComponent implements OnInit {
  data: any[];
  filterQuery = "";
  rowsOnPage = 100;
  sum1: number = 0;
  showlinkbutton = true;
  payment: any[];
  customer_id: string = "";
  amount = "";
  date1 = "";
  idToDelete;
  showOptionsDiv: boolean = false;
  paymentName;

  constructor(private _SunamiService: SunamiserviceService, private toasterService: ToasterService, private userservice: UserServiceService) {
    this.date1 = this.userservice.getdate();
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
    this._SunamiService.getcashRecords().subscribe(
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

  getCurrency(): string{
    return UserServiceService.currency;
  }

  private exporttoexcel() {
    this.userservice.exporttoexcel(GeneralFilterPipe.filteredArray, "cash_records");
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
