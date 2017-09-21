import { Component, OnInit } from '@angular/core';
import { SunamiserviceService } from '../sunamiservice.service';
import { paymentRatesClass, paymentRatesClassPerClient } from '../classes/paymentRates';
import { ToasterService, Toast } from 'angular2-toaster';
import { UserServiceService } from '../user-service.service';
import { GeneralFilterPipe } from "app/general-filter.pipe";

@Component({
    selector: 'app-customer-details',
    templateUrl: './customer-details.component.html',
    styleUrls: ['./customer-details.component.css'],
})
export class CustomerDetailsComponent implements OnInit {
    //public data: paymentRatesClass[];
    private data: any[];
    private dataSwitch: any;
    private filterQuery = "";
    private rowsOnPage = 100;
    private sortOrder = "asc";
    private showlinkbutton = true;


    private id = "";
    private name = "";
    private number1 = "";
    private number2 = "";
    private number3 = "";
    private box = "";
    private occupation = "";
    private witness = "";
    private witnessid = "";
    private village = "";
    private city = "";
    private description = "";
    private latG = "";
    private lonG = "";
    private recordedBy = "";
    private date1 = "";
    private location = "";
    private package = "";

    private Fshowlinkbutton() {
        this.showlinkbutton = false;
    }

    private CANCEL() {
        //clear all fields
        this.showlinkbutton = true;
    }

    private customer: any[];
    private submit() {
        this.customer = [];
        if (this.id != null || this.id != "") {
            this.customer.push({
                recordedBy: UserServiceService.email, latG: "", lonG: "", id: this.id, name: this.name, number1: this.number1,
                number2: this.number2, number3: this.number3, box: this.box, occupation: this.occupation, witness: this.witness, witnessid: this.witnessid,
                village: this.village, city: this.city, description: this.description, location: this.location, date1: this.date1, package: this.package
            });

            this._SunamiService.postNewCustomer(this.customer).subscribe(
                (data) => this.popToast("success", data), //Bind to view
                err => {
                    // Log errors if any
                    this.popToast("no internet", err);
                });
        }
        else {
            this.popToast("error", "enter id number please");
        }
        this.showlinkbutton = true;
    }

    constructor(private _SunamiService: SunamiserviceService, private toasterService: ToasterService, private userservice: UserServiceService) {
        this.date1 = this.userservice.getdate();
    }

    ngOnInit(): void {
        /*with delay
         this._SunamiService.getPaymentRates().subscribe((data:paymentRatesClass[])=> {
                 setTimeout(()=> {
                     this.data = data;
                 }, 6000);
             });*/
        this._SunamiService.getCustomerDetails().subscribe(
            (data) => this.data = data, //Bind to view
            err => {
                // Log errors if any
                this.popToast("no internet", err);
            });
    }

  fetchDetailsIfExisting(id) {
      alert(id.value);
      this._SunamiService.getSingleCustomerDetails(id.value).subscribe(res => {
       this.name = res['Name'];
      });

    /*
      ID;
        Occupation;
        Mobile;
        Mobile2;
        Mobile3;
        village;
        location;
        city;
        installdate;
        Witness;
        Witness_ID;
        status;
      */
  }
    /*
        private filterByVillage(){
             this.filterQuery="Village"+this.filterVillage;
             if(this.filterVillage == ""){
                 this.filterQuery = "";
             }
        }*/


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
