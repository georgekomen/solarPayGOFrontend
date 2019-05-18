import { Component, OnInit, Input, ViewChild, Renderer, ElementRef, ContentChildren } from '@angular/core';
import { SunamiserviceService } from '../../sunamiservice.service';
import { paymentRatesClass, paymentRatesClassPerClient } from '../../classes/paymentRates';
import { ToasterService, Toast } from 'angular2-toaster';
import { GeneralFilterPipe } from "app/general-filter.pipe";
import { UserServiceService } from '../../user-service.service';

@Component({
  selector: 'app-allpayments',
  templateUrl: './allpayments.component.html',
  styleUrls: ['./allpayments.component.css']
})
export class AllpaymentsComponent implements OnInit {
  flag = 0;
  @Input() set _fetchData(fetchData){
    if(fetchData != this.flag){
      this.requestData();
    }
  }
  @Input() Cdata: any;
  data: any[];
  data1: any[];
  filterQuery = "";
  rowsOnPage = 100;
  sortBy = "";
  sortOrder = "asc";
  customer_id;
  sum1 = 0;
  constructor(private _SunamiService: SunamiserviceService, private toasterService: ToasterService, private userservice: UserServiceService) {
  }

  ngOnInit() {

  }

  getCurrency(): string{
    return UserServiceService.currency;
  }

  ngOnChanges(changes: any) {
    console.log(this.Cdata);
    this.requestData();
  }

  changesum() {
    setTimeout(() => {
      this.sum1 = 0;
      for (let key in GeneralFilterPipe.filteredArray) {
        this.sum1 += parseInt(GeneralFilterPipe.filteredArray[key].Amount);
      }
    }, 1000)
  }

  requestData() {
    this.data = null;
    this._SunamiService.getPaymentPerCustomer(this.Cdata).subscribe(
      (data) => this.datagot(data),
      err => {
        this.popToast("no internet", err);
      }
    );
  }

  datagot(f: any[]) {
    this.data = f;
    this.changesum();
  }

  hideloader() {
    document.getElementById("loading").style.display = "none";
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
    this.userservice.exporttoexcel(GeneralFilterPipe.filteredArray, "all_payments");
  }
}
