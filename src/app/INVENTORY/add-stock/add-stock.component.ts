import { Component, OnInit } from '@angular/core';
import { SunamiserviceService } from '../../sunamiservice.service';
import { paymentRatesClass, paymentRatesClassPerClient } from '../../classes/paymentRates';
import { ToasterService, Toast } from 'angular2-toaster';
import { UserServiceService } from '../../user-service.service';
import { GeneralFilterPipe } from '../../general-filter.pipe';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent implements OnInit {
  private Stock: string = "";
  private itemName: string = "";
  private units: string = "";

  private newitem: any[] = [];

  constructor(private _SunamiService: SunamiserviceService, private toasterService: ToasterService, private userservice: UserServiceService) { }

  ngOnInit() {

  }

  private submitData() {
    if (this.Stock != "" && this.Stock != null && this.itemName != "" && this.itemName != null) {
      this.newitem.push({ Stock: this.Stock, units: this.units, itemName: this.itemName, loogeduser: UserServiceService.email });
      this._SunamiService.postRecordItem(this.newitem).subscribe(
        (data) => this.popToast("results", data), //Bind to view
        err => {
          // Log errors if any
          this.popToast("no internet", err);
        });
    }
  }

  private popToast(t: string, b: string) {
    var toast: Toast = {
      type: 'error',
      title: t,
      body: b
    };

    this.toasterService.pop(toast);
  }

  private CANCEL() {

  }
}
