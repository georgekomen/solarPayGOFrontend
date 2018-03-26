import { Component, OnInit } from '@angular/core';
import { SunamiserviceService } from '../sunamiservice.service';
import { paymentRatesClass, paymentRatesClassPerClient } from '../classes/paymentRates';
import { ToasterService, Toast } from 'angular2-toaster';
import { UserServiceService } from '../user-service.service';
import { GeneralFilterPipe } from '../general-filter.pipe';
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-switchinglogs',
  templateUrl: './switchinglogs.component.html',
  styleUrls: ['./switchinglogs.component.css']
})
export class SwitchinglogsComponent implements OnInit {
  data: any[];
  public filterQuery = "";
  public rowsOnPage = 100;
  constructor(private activatedRoute: ActivatedRoute,private _SunamiService: SunamiserviceService, private toasterService: ToasterService, private userservice: UserServiceService) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params)=>{
      const id = params['customer_id'];
      if(id != null && id != undefined && id != 0) {
        this._SunamiService.getswitchlogsPerCustomer(id).subscribe(
          (data) => this.data = data, //Bind to view
          err => {
            // Log errors if any
            this.popToast("no internet", err);
          });
      } else {
        this.getAlllogs();
      }
    },error2 => {

    });
  }

  getAlllogs(){
    this._SunamiService.getswitchlogs().subscribe(
      (data) => this.data = data, //Bind to view
      err => {
        // Log errors if any
        this.popToast("no internet", err);
      });
  }

  public popToast(t: string, b: string) {
    var toast: Toast = {
      type: 'error',
      title: t,
      body: b
    };

    this.toasterService.pop(toast);
  }

   hideloader() {
    document.getElementById("loading").style.display = "none";
  }

   exporttoexcel() {
    this.userservice.exporttoexcel(GeneralFilterPipe.filteredArray, "switch_logs");
  }

}
