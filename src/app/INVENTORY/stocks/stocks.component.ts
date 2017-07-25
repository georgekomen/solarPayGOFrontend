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
  private filterQuery = "";
  private rowsOnPage = 100;
  private date1: string = "2017-06-01";
  private data: any[] = [];
  private itemselected: any = "";

  constructor(private _SunamiService: SunamiserviceService, private toasterService: ToasterService, private _user: UserServiceService) { }

  ngOnInit() {
    this.date1 = this._user.getdate();
    this._SunamiService.getInventory(this._user.getdate()).subscribe(
      data => this.data = data, //Bind to view
      err => {
        this.popToast("no internet", err);
      });
  }

  private updateitemselected(item: string) {
    this.itemselected = item;
  }

  private requestdata() {
    this.data = [];
    this._SunamiService.getInventory(this.date1).subscribe(
      data => this.data = data, //Bind to view
      err => {
        this.popToast("no internet", err);
      });
  }

  private popToast(t: string, b: string) {
    var toast: Toast = {
      type: 'error',
      title: t,
      body: b
    };
    this.toasterService.pop(toast);
  }

}
