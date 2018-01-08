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
     data: any[];
     dataSwitch: any;
     filterQuery = "";
     rowsOnPage = 100;
     sortOrder = "asc";
     showlinkbutton = true;

     invoiceItems: any[] = [];
     id = "";
     name = "";
     number1 = "";
     number2 = "";
     number3 = "";
     box = "";
     occupation = "";
     witness = "";
     witnessid = "";
     village = "";
     city = "";
     description = "";
     latG = "";
     lonG = "";
     recordedBy = "";
     date1 = "";
     location = "";
     package = "";

     Fshowlinkbutton() {
        this.showlinkbutton = false;
    }

     CANCEL() {
        //clear all fields
        this.showlinkbutton = true;
    }

     customer: any[];
     submit() {
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

  getInvoiceItems() {
    this._SunamiService.getInvoiceItems().subscribe(res => {
      this.invoiceItems = res;
    });
  }

    ngOnInit(): void {
      this.getInvoiceItems();
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
      this.showloader();
      this._SunamiService.getSingleCustomerDetails(id.value).subscribe(res => {
       // Todo - fill all fields next time
        this.hideloader();
       this.date1 = res['installdate'].substring(0, res['installdate'].indexOf('T'));
       this.package = res['Package'];
      }, error2 => {
        this.hideloader();
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


     hideloader() {
        document.getElementById("loading").style.display = "none";
    }

   showloader() {
    document.getElementById("loading").style.display = "block";
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
        this.userservice.exporttoexcel(GeneralFilterPipe.filteredArray, "test1");
    }

}
