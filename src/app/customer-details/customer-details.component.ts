import { Component, OnInit } from '@angular/core';
import { SunamiserviceService } from '../sunamiservice.service';
import { ToasterService, Toast } from 'angular2-toaster';
import { UserServiceService } from '../user-service.service';
import { GeneralFilterPipe } from "app/general-filter.pipe";
import {Customer} from "./shared/customer";
import {InvoiceItem} from "./shared/invoiceItem";

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css'],
})
export class CustomerDetailsComponent implements OnInit {
  data: Customer[] = [];
  filterQuery = "";
  rowsOnPage = 100;
  sortOrder = "asc";
  showlinkbutton = true;
  customer1: Customer = new Customer();
  invoiceItems: InvoiceItem[]=[];
  Fshowlinkbutton() {
    this.showlinkbutton = false;
  }

  CANCEL() {
    this.showlinkbutton = true;
  }

  submit() {
    this.customer1.recordedBy = UserServiceService.email;
    this.customer1.latG="";
    this.customer1.lonG="";
    this.customer1.date1 = this.customer1.installdate;
    if (this.customer1.id != null || this.customer1.id != "") {
      this._SunamiService.postNewCustomer([this.customer1]).subscribe(
        (data) => this.popToast("success", data), //Bind to view
        err => {
          this.popToast("no internet", err);
        });
    }
    else {
      this.popToast("error", "enter id number please");
    }
    this.showlinkbutton = true;
  }

  constructor(private _SunamiService: SunamiserviceService, private toasterService: ToasterService, private userservice: UserServiceService) {
    this.customer1.date1 = this.userservice.getdate();
  }

  ngOnInit(): void {
    this._SunamiService.getCustomerDetails().subscribe(
      (data) => this.data = data,
      err => {
        this.popToast("no internet", err);
      });
    this.getInvoiceItems();
  }

  getInvoiceItems() {
    this._SunamiService.getInvoiceItems().subscribe(res => {
      this.invoiceItems = res;
    });
  }

  fetchDetailsIfExisting(idd) {
    this.customer1 = new Customer();
    this.showloader();
    this._SunamiService.getSingleCustomerDetails(idd.value).subscribe(res => {
      // Todo - fill all fields next time
      this.hideloader();
      if(res != null){
        this.customer1 = res;
        this.customer1.installdate = this.customer1.installdate.toString().substring(0,this.customer1.installdate.toString().indexOf('T'));
      }

    }, error2 => {
      this.hideloader();
    });
  }

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
