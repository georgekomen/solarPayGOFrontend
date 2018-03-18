import { Component, OnInit } from '@angular/core';
import { SunamiserviceService } from '../sunamiservice.service';
import { paymentRatesClass, paymentRatesClassPerClient } from '../classes/paymentRates';
import { ToasterService, Toast } from 'angular2-toaster';
import { CompleterService, CompleterData } from 'ng2-completer';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { UserServiceService } from '../user-service.service';
import { GeneralFilterPipe } from '../general-filter.pipe';

@Component({
  selector: 'app-uninstallations',
  templateUrl: './uninstallations.component.html',
  styleUrls: ['./uninstallations.component.css']
})
export class UninstallationsComponent implements OnInit {

  public customers: any[];
  public data: any[];
  public filterQuery = "";
  public rowsOnPage = 100;
  public sortOrder = "asc";
  Reason: string = "";
  public date1: string = "";

  constructor(private completerService: CompleterService, private _SunamiService: SunamiserviceService, private toasterService: ToasterService,private userservice: UserServiceService) {
    this.date1 = this.userservice.getdate();
  }

  ngOnInit(): void {
    this.getUninstalledSystems();
  }

  getUninstalledSystems() {
    this.data = null;
    this._SunamiService.getUninstalledSystems().subscribe(
      (data) => this.data = data, //Bind to view
      err => {
        // Log errors if any
        this.popToast("no internet", err);
      });
  }

  createObj2(data2: any[]) {
    //this.customers = data2;
    this.customers = [];
    for (let key in data2) {
      this.customers.push(data2[key].id);
    }
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
        this.userservice.exporttoexcel(GeneralFilterPipe.filteredArray, "test1");
    }

}
