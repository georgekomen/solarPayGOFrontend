import { Component, OnInit } from '@angular/core';
import { SunamiserviceService } from '../../sunamiservice.service';
import { ToasterService, Toast } from 'angular2-toaster';
import { UserServiceService } from '../../user-service.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
   filterQuery = "";
   rowsOnPage = 100;
   date1: string = "2017-06-01";
   data: any[] = [];
   itemselected: any = "";

  constructor(private _SunamiService: SunamiserviceService, private toasterService: ToasterService, private _user: UserServiceService) { }

  ngOnInit() {
    this.date1 = this._user.getdate();
    this._SunamiService.getInventory(this._user.getdate()).subscribe(
      data => this.data = data, //Bind to view
      err => {
        this.popToast("no internet", err);
      });
  }

   updateitemselected(item: string) {
    this.itemselected = item;
  }

   requestdata() {
    this.data = [];
    this._SunamiService.getInventory(this.date1).subscribe(
      data => this.data = data, //Bind to view
      err => {
        this.popToast("no internet", err);
      });
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
