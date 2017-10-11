import { Component, OnInit, Input, ViewChild, Renderer, ElementRef, ContentChildren } from '@angular/core';
import { SunamiserviceService } from '../../sunamiservice.service';
import { paymentRatesClass, paymentRatesClassPerClient } from '../../classes/paymentRates';
import { ToasterService, Toast } from 'angular2-toaster';
import { DataFilterPipe } from "app/data-filter.pipe";
import { GeneralFilterPipe } from "app/general-filter.pipe";
import { UserServiceService } from '../../user-service.service';

@Component({
  selector: 'app-baddebts',
  templateUrl: './baddebts.component.html',
  styleUrls: ['./baddebts.component.css']
})
export class BaddebtsComponent implements OnInit {
    //public data: paymentRatesClass[];
     data: any[];
     dataSwitch: any;
     filterQuery = "";
     rowsOnPage = 100;
     sortBy = "";
     sortOrder = "asc";
     filterPayRate = "";
     filterPayRate1 = "";
     sumAmountDebt: number = 0;
     sumAmountInvoiced: number = 0;
     percent: string;
     state: string = '';
     data2: any[];
     openModalWindow: boolean = false;
     customer_id: any = "";
     debtAmount = 0;
     OpenPayHistory(i: any) {
        this.openModalWindow = true;
        this.customer_id = i;
    }

     cancelImageModel() {
        this.openModalWindow = false;
    }

    constructor(private _SunamiService: SunamiserviceService, private toasterService: ToasterService, private userservice: UserServiceService) {

    }

    ngOnInit(): void {
        /*with delay
          this._SunamiService.GetPaymentActiveRates().subscribe((data:paymentRatesClass[])=> {
            setTimeout(()=> {
                this.data = data;
            }, 6000);
        });*/

        this._SunamiService.GetPaymentInactiveRates().subscribe(
            (data) => this.calcSum(data), //Bind to view
            err => {
                // Log errors if any
                this.popToast("no internet", err);
            });
    }


     calcSum(data1: any[]) {
        //create a new array
        //Amount, Invoice, Percent, To, Comment, Village, Phone, Status
        this.data = [];
        for (let key in data1) {
            this.debtAmount = parseInt(data1[key].Invoice) - parseInt(data1[key].Amount);
            this.data.push({
                Id: data1[key].Id,
                Name: data1[key].Name,
                From: data1[key].From,
                Amount: data1[key].Amount,
                Invoice: data1[key].Invoice,
                Debt: this.debtAmount,
                Percent: ((this.debtAmount / data1[key].Invoice)*100).toFixed(2),
                To: data1[key].To,
                Comment: data1[key].Comment,
                Village: data1[key].Village,
                Phone: data1[key].Phone,
                Status: data1[key].Status
            });
        }
        //sort the complex array
        this.data.sort(function (a, b) { return (parseInt(a.Debt) > parseInt(b.Debt)) ? 1 : ((parseInt(b.Debt) > parseInt(a.Debt)) ? -1 : 0); });
        this.data.reverse();

        this.sumAmountInvoiced = 0;
        for (let key in this.data) {
            this.sumAmountDebt += parseInt(this.data[key].Debt);
            this.sumAmountInvoiced += parseInt(this.data[key].Invoice);
        }
        this.percent = ((100 * this.sumAmountDebt) / this.sumAmountInvoiced).toFixed(2);
    }

     changesumgen() {
        this.sumAmountDebt = 0;
        this.sumAmountInvoiced = 0;
        for (let key in GeneralFilterPipe.filteredArray) {
            this.sumAmountDebt += parseInt(GeneralFilterPipe.filteredArray[key].Debt);
            this.sumAmountInvoiced += parseInt(GeneralFilterPipe.filteredArray[key].Invoice);
        }
        this.percent = ((100 * this.sumAmountDebt) / this.sumAmountInvoiced).toFixed(2);
    }

     changesumdata() {
        this.sumAmountDebt = 0;
        this.sumAmountInvoiced = 0;
        for (let key in DataFilterPipe.filteredArray) {
            this.sumAmountDebt += parseInt(DataFilterPipe.filteredArray[key].Amount);
            this.sumAmountInvoiced += parseInt(DataFilterPipe.filteredArray[key].Invoice);
        }
        this.percent = ((100 * this.sumAmountDebt) / this.sumAmountInvoiced).toFixed(2);
    }

     filterByPayRate() {
        this.filterPayRate1 = "PayRate" + this.filterPayRate;
        if (this.filterPayRate == "") {
            this.filterPayRate1 = "";
        }
        setTimeout(() => {
            this.changesumdata();
        }, 1000)
    }

     filterByBeg() {

    }

     filterByEnd() {

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
