import { Component, OnInit } from '@angular/core';
import { SunamiserviceService } from '../sunamiservice.service';
import { ToasterService, Toast } from 'angular2-toaster';
import { UserServiceService } from '../user-service.service';
import { GeneralFilterPipe } from "app/general-filter.pipe";
import {Customer} from "./shared/customer";
import {Packages} from "./shared/invoiceItem";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css'],
})
export class CustomerDetailsComponent implements OnInit {
  public static data: Customer[] = [];
  filterQuery = "";
  rowsOnPage = 100;
  sortOrder = "asc";
  showlinkbutton = true;
  customer1: Customer = new Customer();
  invoiceItems: Packages[]=[];
  showOptionsDiv: boolean = false;
  selectedCustomer: Customer;
  newCustomer: boolean = false;

  constructor(private router: Router, private _SunamiService: SunamiserviceService, private toasterService: ToasterService, private userservice: UserServiceService) {
    this.customer1.date1 = this.userservice.getdate();
  }

  public getData(): Customer[]{
    return CustomerDetailsComponent.data;
  }

  ngOnInit(): void {
    if(CustomerDetailsComponent.data.length == 0){
      this.getCustomerList();
    }
    this.getInvoiceItems();
  }

  getCustomerList(){
    this._SunamiService.getCustomerDetails().subscribe(data =>{
      CustomerDetailsComponent.data = data;
      CustomerDetailsComponent.data.forEach(res=>{
        res.installdate = res.installdate.toString().substring(0,res.installdate.toString().indexOf('T'));
      });
    },err => {
      this.popToast("no internet", err);
    });
  }

  Fshowlinkbutton() {
    this.showlinkbutton = false;
    this.newCustomer = true;
  }

  EditCustomer(){
    this.showlinkbutton = false;
    this.showOptionsDiv = false;
    this.customer1 = this.selectedCustomer;
  }

  makePayment(){
    this.router.navigate(['makepayment', this.selectedCustomer.id]);
  }

  invoiceCustomer(){
    this.router.navigate(['invoiceitem', this.selectedCustomer.id]);
  }

  textCustomer(){
    this.router.navigate(['textmodal', this.selectedCustomer.id]);
  }

  reportIssue(){
    this.router.navigate(['issuerecord', this.selectedCustomer.id]);
  }

  linkController(){
    this.router.navigate(['link-controller', this.selectedCustomer.id]);
  }

  uninstallCustomer(){
    this.router.navigate(['uninstall', this.selectedCustomer.id]);
  }

  getLogs(){
    this.router.navigate(['switching', this.selectedCustomer.id]);
  }

  customerToEdit(item){
    this.showOptionsDiv = true;
    this.selectedCustomer = item;
  }

  CANCEL() {
    this.newCustomer = false;
    this.showlinkbutton = true;
    this.customer1 = new Customer();
  }

  submit() {
    this.customer1.recordedBy = UserServiceService.email;
    this.customer1.date1 = this.customer1.installdate;
    if ((this.customer1.id != null || this.customer1.id != "") && this.customer1.village != null ) {
      this._SunamiService.postNewCustomer([this.customer1]).subscribe(
        (data) => {
          this.newCustomer = false;
          this.popToast("success", data);

          setTimeout(()=>{
            this.showlinkbutton = true;
            this.getCustomerList();
          },2000);
        },err => {
          this.popToast("no internet", err);
        });

    }
    else {
      this.popToast("error", "make sure you entered id number and the village name");
    }
  }

  getInvoiceItems() {
    this._SunamiService.getInvoiceItems().subscribe(res => {
      this.invoiceItems = res;
    });
  }

  fetchDetailsIfExisting(idd) {
    this.showloader();
    this._SunamiService.getSingleCustomerDetails(idd.value).subscribe(res => {
      // Todo - fill all fields next time
      this.hideloader();
      if(res != null){
        //this.customer1 = res;
        //this.customer1.installdate = this.customer1.installdate.toString().substring(0,this.customer1.installdate.toString().indexOf('T'));
        this.popToast('error','the id is already registered to a customer');
        setTimeout(()=>{
          this.CANCEL();
        },2000);
      } else {
        const id = this.customer1.id;
        this.customer1 = new Customer();
        this.customer1.id = id;
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
    this.userservice.exporttoexcel(GeneralFilterPipe.filteredArray, "customer_list");
  }
}
