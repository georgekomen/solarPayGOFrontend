import { Component, OnInit } from '@angular/core';
import { SunamiserviceService } from '../sunamiservice.service';
import { ToasterService, Toast } from 'angular2-toaster';
import { UserServiceService } from '../user-service.service';
import { GeneralFilterPipe } from "app/general-filter.pipe";
import {Customer} from "./shared/customer";

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css'],
})
export class CustomerDetailsComponent implements OnInit {
  data: any[];
  filterQuery = "";
  rowsOnPage = 100;
  sortOrder = "asc";
  showlinkbutton = true;
  customer1: Customer = new Customer();

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
      (data) => this.data = data, //Bind to view
      err => {
        this.popToast("no internet", err);
      });
  }

  fetchDetailsIfExisting(id) {
    this.showloader();
    this._SunamiService.getSingleCustomerDetails(id.value).subscribe(res => {
      // Todo - fill all fields next time
      this.hideloader();
      this.customer1.date1 = res['installdate'].substring(0, res['installdate'].indexOf('T'));
      this.customer1.package = res['Package'];
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
