import { Component, OnInit, Input, ViewChild, Renderer, ElementRef, ContentChildren } from '@angular/core';
import { SunamiserviceService } from '../../sunamiservice.service';
import { paymentRatesClass, paymentRatesClassPerClient } from '../../classes/paymentRates';
import { ToasterService, Toast } from 'angular2-toaster';
import { GeneralFilterPipe } from "app/general-filter.pipe";
import { UserServiceService } from '../../user-service.service';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent implements OnInit {
  @Input() Cdata: any = "";
   enter: boolean;
  sortBy;
  sortOrder;
   cd: any = "";
   data: any[] = [];
   filterQuery = "";
   rowsOnPage = 100;
   method: string = "";
   number1: number = 0;
   comment1: string = "";
   update: any[] = [];
   item: string = "";

  constructor(private _SunamiService: SunamiserviceService, private toasterService: ToasterService) { }

  ngOnInit() {
  }

  //detect any changes in bound data
  ngOnChanges(changes: any) {
    console.log(this.Cdata);
    if (this.Cdata != this.cd) {
      this.requestdata(this.Cdata);
      document.getElementById("openModalButton").click();
    }
    this.cd = this.Cdata;
  }

   addstock() {
    this.enter = !this.enter;
    this.method = "add";
  }

   dispstock() {
    this.enter = !this.enter;
    this.method = "dispense";
  }

   updatestock() {
    if (this.number1 > 0) {
      this.item = this.Cdata;
      this.update.push({ item: this.item, comment: this.comment1, number: this.number1, method: this.method, loogeduser: UserServiceService.email });
      this._SunamiService.postUpdateStock(this.update).subscribe(
        data => {
          this.popToast("result", data);
        },
        err => {
          this.popToast("no internet", err);
        }
      )
      this.update = [];
      this.method = "";
      this.number1 = 0;
      this.item = "";
    }
    else {
      this.popToast("error", "enter valid number");
    }

  }

   requestdata(Cdataa: any) {
    this.data = [];
    this._SunamiService.getStockDetails(Cdataa).subscribe(
      data => this.data = data, //Bind to view
      err => {
        this.popToast("no internet", err);
      });
  }

   popToast(t: string, b: string) {
    var toast: Toast = {
      type: 'error',
      title: t,
      body: b
    };
    this.toasterService.pop(toast);
  }

}
