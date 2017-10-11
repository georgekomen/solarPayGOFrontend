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
     data: any[];
     filterQuery = "";
     rowsOnPage = 100;
     sum1: number = 0;

    constructor(private _SunamiService: SunamiserviceService,private userservice:UserServiceService, private toasterService: ToasterService) {

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

     exporttoexcel(){
        this.userservice.exporttoexcel(GeneralFilterPipe.filteredArray,"test1");
    }

     print1() {
        this.userservice.print1('foo');
    }
}
