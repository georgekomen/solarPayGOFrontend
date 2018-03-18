import { Component, OnInit } from '@angular/core';
import {UninstallCustomerPayload} from "./shared/UninstallCustomerPayload";
import {ActivatedRoute, Params} from "@angular/router";
import {UserServiceService} from "../user-service.service"
import {SunamiserviceService} from "../sunamiservice.service";
import {Toast, ToasterService} from "angular2-toaster";
@Component({
  selector: 'app-uninstall-customer',
  templateUrl: './uninstall-customer.component.html',
  styleUrls: ['./uninstall-customer.component.css']
})
export class UninstallCustomerComponent implements OnInit {

  reasons:any[] = ['Payment issue', 'Connected to grid'];

  uninstall: UninstallCustomerPayload;
  constructor(private toasterService: ToasterService, private activatedRoute: ActivatedRoute, private Userservice: UserServiceService, private _SunamiService:SunamiserviceService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params)=>{
      this.uninstall = new UninstallCustomerPayload();
      this.uninstall.customer_id = params['customer_id'];
      this.uninstall.recorded_by = UserServiceService.email;

    },error2 => {

    });
  }

  public submit() {
    if(confirm('Are sure you want to proceed with this?') == true) {
      this._SunamiService.postUninstall([this.uninstall]).subscribe(
        (data) => this.popToast("results", data), //Bind to view
        err => {
          this.popToast("no internet", err);
        });
    } else {

    }
  }

  public popToast(t: string, d: any[]) {
    var toast: Toast = {
      type: 'error',
      title: t,
      body: d
    };
    this.toasterService.pop(toast);
  }

}
