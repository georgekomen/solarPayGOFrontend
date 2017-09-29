import { Component, OnInit } from '@angular/core';
import { SunamiserviceService } from '../../sunamiservice.service';
import { paymentRatesClass, paymentRatesClassPerClient } from '../../classes/paymentRates';
import { ToasterService, Toast } from 'angular2-toaster';
import { GeneralFilterPipe } from "app/general-filter.pipe";
import { UserServiceService } from '../../user-service.service';

@Component({
    selector: 'app-unprocessed-mpesa',
    templateUrl: './unprocessed-mpesa.component.html?v=${new Date().getTime()}',
    styleUrls: ['./unprocessed-mpesa.component.css?v=${new Date().getTime()}']
})
export class UnprocessedMpesaComponent implements OnInit {
    private data: any[];
    private filterQuery = "";
    private rowsOnPage = 100;
    private sum1: number = 0;
    private payment: any[];
    private res = "";
    private customer_ids: any[];
    private customer_id: string = "";
    private Code1: string = "";
    private paydiv = false;
    selectedPayment: any;

    private showpaydiv(value) {
        this.Code1 = value.Reference;
        this.selectedPayment = value;
        this.paydiv = true;
    }
    private hidepaydiv() {
        this.paydiv = false;
    }

    constructor(private _SunamiService: SunamiserviceService, private toasterService: ToasterService,private userservice:UserServiceService) {
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

    private popToast(t: string, b: string) {
        var toast: Toast = {
            type: 'error',
            title: t,
            body: b
        };

        this.toasterService.pop(toast);
    }

    private popToast2(b: string) {
        var toast: Toast = {
            type: 'error',
            title: "Result",
            body: b
        };

        this.toasterService.pop(toast);
    }

    private linkpayment() {
        this.hidepaydiv();
        if (confirm('are you sure you want to credit ' + this.selectedPayment.Amount + ' to customer id number ' + this.customer_id)) {
          this.payment = [];
          if (this.customer_id != null || this.customer_id != "") {
            this.payment.push({
              loggedUser: UserServiceService.email, PayMode: "mpesa",
              Customer_Id: this.customer_id, Code: this.Code1
            });
            this._SunamiService.postmakePayment(this.payment).subscribe(
              (data) => this.popToast2(data), //Bind to view
              err => {
                // Log errors if any
                this.popToast("no internet", err);
              });
          } else {
            this.popToast("error!", "Please enter id number");
          }
          this.getUnprocessedMpesa();
        } else {

        }
    }

    ngOnInit() {
        this.getUnprocessedMpesa();
    }



    private getUnprocessedMpesa() {
        this._SunamiService.getUnprocessedMpesaPayments().subscribe(
            (data) => this.UnprocessedMpesaPayments(data), //Bind to view
            err => {
                // Log errors if any
                this.popToast("no internet", err);
            });
    }

    private UnprocessedMpesaPayments(data1: any[]) {
        this.data = [];
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

    private exporttoexcel(){
        this.userservice.exporttoexcel(GeneralFilterPipe.filteredArray,"test1");
    }
}
