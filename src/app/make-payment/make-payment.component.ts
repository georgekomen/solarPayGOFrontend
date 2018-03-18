import { Component, OnInit } from '@angular/core';
import {Payment} from "./shared/payment";
import {SunamiserviceService} from "../sunamiservice.service";
import {Toast, ToasterService} from "angular2-toaster";
import {UserServiceService} from "../user-service.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.css']
})
export class MakePaymentComponent implements OnInit {
  banknames = ["Equity", "KCB", "Co-op", "Other"];
  payment: Payment;
  paymodes = ['cash', 'bank', 'mtn_uganda', 'airtel_uganda', 'mpesa'];
  constructor(private activatedRoute: ActivatedRoute, private _SunamiService:SunamiserviceService, private toasterService: ToasterService, private UserServiceService: UserServiceService) { }

  ngOnInit() {
    this.payment = new Payment();
    this.activatedRoute.params.subscribe((params: Params)=>{
      this.payment.Customer_Id = params['customer_id'];
    },error2 => {

    });
  }

  linkpayment() {
    if(confirm('Are you sure you want to proceed?')==true) {
      if (this.payment.Customer_Id != null || this.payment.Customer_Id != "") {
        this.payment.loggedUser = UserServiceService.email;
        this._SunamiService.postmakePayment([this.payment]).subscribe(data => {
          this.popToast("result", data);
        }, err => {
          this.popToast("no internet", err);
        });
      }
      else {
        this.popToast("error!", "Please enter id number");
      }
    }
  }

  popToast(t: string, b: string) {
    var toast: Toast = {
      type: 'error',
      title: t,
      body: b
    };
    this.toasterService.pop(toast);
  }

}
