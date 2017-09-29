import { Component, OnInit } from '@angular/core';
import { SunamiserviceService } from '../sunamiservice.service';
import { paymentRatesClass, paymentRatesClassPerClient } from '../classes/paymentRates';
import { ToasterService, Toast } from 'angular2-toaster';
import { UserServiceService } from '../user-service.service';
import { GeneralFilterPipe } from '../general-filter.pipe';

@Component({
  selector: 'app-addcontroller',
  templateUrl: './addcontroller.component.html?v=${new Date().getTime()}',
  styleUrls: ['./addcontroller.component.css?v=${new Date().getTime()}']
})
export class AddcontrollerComponent implements OnInit {
  private controller: any[] = [];
  private data: any[];
  private imei: string = "";
  private sim: string = "";
  private provider: string = "";
  private version: string = "";
  private filterQuery = "";
  private rowsOnPage = 100;
  private showlinkbutton = true;

  imeiToDelete;
  showOptionsDiv: boolean = false;
  selectedController: any;
  action: string = 'create';

  constructor(private _SunamiService: SunamiserviceService, private toasterService: ToasterService, private userservice: UserServiceService) {

  }

  ngOnInit() {
    this._SunamiService.getSunamiControllers().subscribe(
      (data) => this.data = data, //Bind to view
      err => {
        // Log errors if any
        this.popToast("error", err, err);
      });
  }

  private submit() {
    if (this.imei.length > 10 && this.sim != "" && this.provider != "") {
      this.controller.push({ imei: this.imei, sim: this.sim, provider: this.provider, version: this.version, action: this.action, loogeduser: UserServiceService.email });
      this._SunamiService.postAddController(this.controller).subscribe(data1 => {
          this.popToast("Result", data1[0].message, data1[1].content);
        }, err => {
          // Log errors if any
          this.popToast("no internet", err, this.data);
        });
    } else {
      this.popToast("error", "Fill all fields appropriately", this.data);
    }
    this.controller = [];
    // by default action is create new controller
    this.action = 'create';
    this.showlinkbutton = true;
  }

  private editController() {
    if(confirm(`are you sure you want to edit this controller imei: ${this.imeiToDelete}? this action is unreversable`)){
      this.showOptionsDiv = false;
      this.Fshowlinkbutton();

      this.imei = this.selectedController.Imei;
      this.sim = this.selectedController.Sim_Number;
      this.version = this.selectedController.Version;
      this.provider = this.selectedController.Provider;
      this.action = 'modify';

    } else {
      this.showOptionsDiv = false;

    }
  }


  private Fshowlinkbutton() {
    this.showlinkbutton = false;
  }

  private CANCEL() {
    //clear all fields
    this.showlinkbutton = true;
  }

  private hideloader() {
    document.getElementById("loading").style.display = "none";
  }

  private popToast(t: string, b: string, d: any[]) {
    this.data = d;
    var toast: Toast = {
      type: 'error',
      title: t,
      body: b
    };

    this.toasterService.pop(toast);
  }

  private exporttoexcel() {
    this.userservice.exporttoexcel(GeneralFilterPipe.filteredArray, "test1");
  }

  private deleteController(){
    if(confirm(`are you sure you want to delete this controller imei: ${this.imeiToDelete}? this action is unreversable`)){
      this._SunamiService.deleteController(this.imeiToDelete).subscribe(res=>{
        this.showOptionsDiv = false;
        this.popToast1('Result', res);
      });
    } else {
      this.showOptionsDiv = false;

    }
  }

  private setdelete(value) {
    this.showOptionsDiv = true;
    this.imeiToDelete = value.Imei;
    this.selectedController = value;
  }

  private popToast1(t: string, b: string) {
    var toast: Toast = {
      type: 'error',
      title: t,
      body: b
    };
    this.toasterService.pop(toast);
  }

}
