import { Component, OnInit } from '@angular/core';
import { SunamiserviceService } from '../../sunamiservice.service';
import { paymentRatesClass, paymentRatesClassPerClient } from '../../classes/paymentRates';
import { ToasterService, Toast } from 'angular2-toaster';
import { GeneralFilterPipe } from "app/general-filter.pipe";
import { UserServiceService } from '../../user-service.service';

@Component({
    selector: 'app-mpesa-payments',
    templateUrl: './mpesa-payments.component.html',
    styleUrls: ['./mpesa-payments.component.css']
})
export class MpesaPaymentsComponent implements OnInit {
    private data: any[];
    private filterQuery = "";
    private rowsOnPage = 100;
    private sum1: number = 0;

    constructor(private _SunamiService: SunamiserviceService,private userservice:UserServiceService, private toasterService: ToasterService) {

    }

    private popToast(t: string, b: string) {
        var toast: Toast = {
            type: 'error',
            title: t,
            body: b
        };

        this.toasterService.pop(toast);
    }

    ngOnInit() {
        this._SunamiService.getmpesaPayments().subscribe(
            (data) => this.allMpesaPayments(data),
            err => { console.log(err); }
        );

    }

    private allMpesaPayments(data1: any[]) {
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

    private print1() {
        this.userservice.print1('foo');
    }
}
