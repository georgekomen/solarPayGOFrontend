import { Component, OnInit } from '@angular/core';
import { SunamiserviceService } from '../../sunamiservice.service';
import { paymentRatesClass, paymentRatesClassPerClient } from '../../classes/paymentRates';
import { ToasterService, Toast } from 'angular2-toaster';
import { UserServiceService } from '../../user-service.service';

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html?v=${new Date().getTime()}'
})

export class SummaryPageComponent implements OnInit {
  public data: any[];
  public date1: string = "";

  constructor(private _SunamiService: SunamiserviceService, private toasterService: ToasterService, private _user: UserServiceService) {
    this.date1 = this._user.getdate();
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
    this._SunamiService.getPaymentSummaryReport(this.date1).subscribe(
      data => this.data = data, //Bind to view
      err => {
        this.popToast("no internet", err);
      });
  }

  public hideloader() {
    document.getElementById("loading").style.display = "none";
  }

  public showloader() {
    document.getElementById("loading").style.display = "initial";
  }

  public requestdata() {
    this.data = null;
    this.showloader();
    //alert(this.date1);
    this._SunamiService.getPaymentSummaryReport(this.date1).subscribe(
      data => this.data = data, //Bind to view
      err => {
        this.popToast("no internet", err);
      });
    this.date1 = this.date1.substring(0, 7);
  }

}