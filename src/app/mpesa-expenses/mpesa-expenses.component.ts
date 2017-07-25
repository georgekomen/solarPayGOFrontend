import { Component, OnInit } from '@angular/core';
import { SunamiserviceService } from '../sunamiservice.service';
import { paymentRatesClass, paymentRatesClassPerClient } from '../classes/paymentRates';
import { ToasterService, Toast } from 'angular2-toaster';

@Component({
  selector: 'app-mpesa-expenses',
  templateUrl: './mpesa-expenses.component.html?v=${new Date().getTime()}',
  styleUrls: ['./mpesa-expenses.component.css?v=${new Date().getTime()}']
})

export class MpesaExpensesComponent implements OnInit {
public data: any[];
    public data1: any[];
    public data2: any[];
    public filterQuery = "";
    public rowsOnPage = 100;
    public filterDate = "";
    public filterNumber = "";
    public filterAmount = "";
    public filterCode = "";
    public filterMessage = "";
    public sum1: number = 0;

    constructor(private _SunamiService: SunamiserviceService, private toasterService: ToasterService) {
        this.data = this.data1;
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
        this._SunamiService.getmpesaPayments().subscribe(
            (data) => this.init1(data),

            err => { console.log(err); }

        );
        this._SunamiService.getUnprocessedMpesaPayments().subscribe(
            (data) => this.data2 = data, //Bind to view
            err => {
                // Log errors if any
                this.popToast("no internet", err);
            });
    }

    public init1(d: any[]) {
        this.data1 = d;
        this.data = d;
        this.calcSum();
    }


    public calcSum() {
        this.sum1 = 0;
        for (let key in this.data) {
            this.sum1 += parseInt(this.data[key].Amount);
        }
    }

    public UnprocessedMpesaPayments() {

        this.data = this.data2;
        this.calcSum();

    }
    public allMpesaPayments() {
        this.data = this.data1;
        this.calcSum();

    }

    public filterByDate() {
        this.filterQuery = "Date" + this.filterDate;
        if (this.filterDate == "") {
            this.filterQuery = "";
        }
    }
    public filterByNumber() {
        this.filterQuery = "Number" + this.filterNumber;
        if (this.filterNumber == "") {
            this.filterQuery = "";
        }
    }
    public filterByAmount() {
        this.filterQuery = "Amount" + this.filterAmount;
        if (this.filterAmount == "") {
            this.filterQuery = "";
        }
    }
    public filterByCode() {
        this.filterQuery = "Code" + this.filterCode;
        if (this.filterCode == "") {
            this.filterQuery = "";
        }
    }
    public filterByMessage() {
        this.filterQuery = "Message" + this.filterMessage;
        if (this.filterMessage == "") {
            this.filterQuery = "";
        }
    }



    public hideloader() {
        document.getElementById("loading").style.display = "none";
    }



}
