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
    private data: any[];
    private dataSwitch: any;
    private filterQuery = "";
    private rowsOnPage = 100;
    private sortBy = "";
    private sortOrder = "asc";
    private filterPayRate = "";
    private filterPayRate1 = "";
    private sumAmountDebt: number = 0;
    private sumAmountInvoiced: number = 0;
    private percent: string;
    private state: string = '';
    private data2: any[];
    private openModalWindow: boolean = false;
    private customer_id: any = "";

    private OpenPayHistory(i: any) {
        this.openModalWindow = true;
        this.customer_id = i;
    }

    private cancelImageModel() {
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

    private debtAmount = 0;
    private calcSum(data1: any[]) {
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

    private changesumgen() {
        this.sumAmountDebt = 0;
        this.sumAmountInvoiced = 0;
        for (let key in GeneralFilterPipe.filteredArray) {
            this.sumAmountDebt += parseInt(GeneralFilterPipe.filteredArray[key].Debt);
            this.sumAmountInvoiced += parseInt(GeneralFilterPipe.filteredArray[key].Invoice);
        }
        this.percent = ((100 * this.sumAmountDebt) / this.sumAmountInvoiced).toFixed(2);
    }

    private changesumdata() {
        this.sumAmountDebt = 0;
        this.sumAmountInvoiced = 0;
        for (let key in DataFilterPipe.filteredArray) {
            this.sumAmountDebt += parseInt(DataFilterPipe.filteredArray[key].Amount);
            this.sumAmountInvoiced += parseInt(DataFilterPipe.filteredArray[key].Invoice);
        }
        this.percent = ((100 * this.sumAmountDebt) / this.sumAmountInvoiced).toFixed(2);
    }

    private filterByPayRate() {
        this.filterPayRate1 = "PayRate" + this.filterPayRate;
        if (this.filterPayRate == "") {
            this.filterPayRate1 = "";
        }
        setTimeout(() => {
            this.changesumdata();
        }, 1000)
    }

    private filterByBeg() {

    }

    private filterByEnd() {

    }

    private switch1(d: any) {
        this.popToast("Results", d);
    }

    private toggleSwitch(k1: string) {
        this._SunamiService.getSwitch(k1, UserServiceService.email).subscribe(
            (dataSwitch) => this.switch1(dataSwitch), //Bind to view
            err => {
                // Log errors if any
                this.popToast("Results", err);
            });
    }

    private toInt(num: string) {
        return +num;
    }

    private sortByWordLength = (a: any) => {
        return a.Comment.length;
    }

    private hideloader() {
        document.getElementById("loading").style.display = "none";
    }

    private showloader() {
        document.getElementById("loading").style.display = "initial";
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
        this.userservice.exporttoexcel(DataFilterPipe.filteredArray, "test1");
    }
}
