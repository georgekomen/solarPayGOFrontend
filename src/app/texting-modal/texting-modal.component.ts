import { Component, Input } from '@angular/core';
import { SunamiserviceService } from '../sunamiservice.service';
import { UserServiceService } from '../user-service.service';
import { GeneralFilterPipe } from '../general-filter.pipe';
import { CustomerPayDetails} from "../INCOMEPAGES/payments/payments.component";
import {ActivatedRoute, Params} from "@angular/router";
import {Toast, ToasterService} from "angular2-toaster";


@Component({
  selector: 'app-texting-modal',
  templateUrl: './texting-modal.component.html',
  styleUrls: ['./texting-modal.component.css']
})
export class TextingModalComponent {
  @Input() Cdata: CustomerPayDetails[] = [];
  SMStext = "";
  SMS1: any[];
  SMSn: any[];
  res: any[];
  filterQuery = "";
  rowsOnPage = 100;
  sortBy;
  sortOrder;
  data: any[] = [];
  customerid;

  constructor(private toasterService: ToasterService, private _SunamiService: SunamiserviceService,private userservice: UserServiceService, private activatedRoute:ActivatedRoute) {

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
    this.activatedRoute.params.subscribe((params: Params)=>{
      const id = params['customer_id'];
      if(id != null && id != undefined) {
        this.customerid = id;
        this.Cdata[0] = new CustomerPayDetails();
        this.Cdata[0].Id = id;
        this.Cdata[0].Amount = 0;
        this.Cdata[0].Invoice = 0;
        this.getMessagesPerCustomer(this.Cdata[0].Id);
      } else {
        this.getMessages();
      }
    },error2 => {

    });
  }

  getMessagesPerCustomer(id){
    this.data = [];
    this._SunamiService.getMessagesPerCustomer(id).subscribe((data) => this.data = data,
      err => {
        console.log(err);
      });
  }

  sendSMS() {
    if(this.Cdata.length > 3){
      this.popToast('warning', 'Cannot send this custom message to ' + this.Cdata.length + ' customers, kindly pick one customer to send message to');
      return;
    }

    if (confirm('are you sure you want to proceed?')) {
      this.SMSn = [];
      this.SMS1 = [];
      this.Cdata.forEach(res => {
        this.SMSn.push({idnumber: res.Id, Invoice: res.Invoice, Paid: res.Amount});
      });
      this.SMS1.push({sender: UserServiceService.email, recipients: this.SMSn, message:"send "+this.SMStext});
      this._SunamiService.postSMS(this.SMS1).subscribe(
        (res) => this.res1(res),
        err => {
          console.log(err);
        });
      this.SMStext = "";
    }
  }

  remindDebt(){
    if(this.Cdata.length > 3){
      this.popToast('warning', 'Cannot send reminder to ' + this.Cdata.length + ' customers, kindly pick one customer to send message to');
      return;
    }

    if (confirm('are you sure you want to remind customer of his/her debt?')) {
      this.SMSn = [];
      this.SMS1 = [];
      this.Cdata.forEach(res => {
        this.SMSn.push({idnumber: res.Id, Invoice: res.Invoice, Paid: res.Amount});
      });
      this.SMS1.push({sender: UserServiceService.email, recipients: this.SMSn, message: "remind "});
      this._SunamiService.postSMS(this.SMS1).subscribe(
        (res) => this.res1(res),
        err => {
          console.log(err);
        });
      this.SMStext = "";
    }
  }

  res1(re:any){
    this.res = re;
    if(this.customerid != null && this.customerid != ''){
       this.getMessagesPerCustomer(this.customerid);
    } else {
      this.getMessages();
    }
  }

  getMessages() {
    this.data = [];
    this._SunamiService.getMessages().subscribe(
      (data) => this.data = data,
      err => {
        console.log(err);
      });
  }

  exporttoexcel() {
    this.userservice.exporttoexcel(GeneralFilterPipe.filteredArray, "SMSs");
  }

}
