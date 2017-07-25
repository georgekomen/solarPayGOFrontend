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
  @Input() Cdata: any;
  private data: any[];
  private data1: any[];
  private filterQuery = "";
  private rowsOnPage = 100;
  private sortBy = "";
  private sortOrder = "asc";
  private customer_id;

  constructor(private _SunamiService: SunamiserviceService, private toasterService: ToasterService, private userservice: UserServiceService) {
  }

  ngOnInit() {

    /*this._SunamiService.getActiveCustomersDetails().subscribe(
      (data) => this.data1 = data, //Bind to view
      err => {
        // Log errors if any
        this.popToast("no internet", err);
      });*/
  }

  //detect any changes in bound data
  ngOnChanges(changes: any) {
    console.log(this.Cdata);
    document.getElementById("openModalButton").click();
    this.requestData();
  }

  private sum1 = 0;
  private changesum() {
    setTimeout(() => {
      this.sum1 = 0;
      for (let key in GeneralFilterPipe.filteredArray) {
        this.sum1 += parseInt(GeneralFilterPipe.filteredArray[key].Amount);
      }
    }, 1000)
  }

  private requestData() {
    this.data = null;
    this._SunamiService.getPaymentPerCustomer(this.Cdata).subscribe( //pass in this.Customer_Id
      (data) => this.datagot(data),
      err => {
        this.popToast("no internet", err);
      }
    );
  }

  private datagot(f: any[]) {
    this.data = f;
    this.changesum();
  }

  private hideloader() {
    document.getElementById("loading").style.display = "none";
  }

  private popToast(t: string, b: string) {
    var toast: Toast = {
      type: 'error',
      title: t,
      body: b
    };

    this.toasterService.pop(toast);
  }

  private exporttoexcel() {
    this.userservice.exporttoexcel(GeneralFilterPipe.filteredArray, "test1");
  }
}
