import { Component, OnInit } from '@angular/core';
import { SunamiserviceService } from '../sunamiservice.service';
import { ToasterService, Toast } from 'angular2-toaster';
import 'rxjs/Rx';
import { UserServiceService } from '../user-service.service';
import { GeneralFilterPipe } from '../general-filter.pipe';
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-link-controller',
  templateUrl: './link-controller.component.html',
  styleUrls: ['./link-controller.component.css'],
  providers: [SunamiserviceService]
})
export class LinkControllerComponent implements OnInit {

  searchData: any[];
  customers: any[];
  imei: string = "";
  customer_id: string = "";
  controller: any[];
  data: any[];
  filterQuery = "";
  rowsOnPage = 100;
  sortOrder = "asc";
  showlinkbutton = true;
  imeitoUnlink;
  showOptionsDiv: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private _SunamiService: SunamiserviceService, private toasterService: ToasterService,private userservice: UserServiceService) {

  }

  ngOnInit(): void {
    this._SunamiService.getFreeImei().subscribe(
      (data) => this.createObj1(data),
      err => {
        this.popToast("no internet", err, this.data);
      });

    this.activatedRoute.params.subscribe((params: Params)=>{
      const id = params['customer_id'];
      if(id != null && id != undefined && id != 0) {
        this.customer_id = id;
        this.showlinkbutton = false;
        this.getSystemDetailsPerCustomer(id);
      } else {
        this.init();
      }
    },error2 => {

    });
  }

  getSystemDetailsPerCustomer(id){
    this._SunamiService.getSystemDetailsPerCustomer(id).subscribe(
      (data) => {
        this.data = data;
        if(this.data.length > 0){
          this.showlinkbutton = true;
        }
      },err => {
            this.popToast("no internet", err, this.data);
      });
  }

  init(){
    this.showlinkbutton = true;
    this.getSytems();
  }

  getSytems() {
    this.data = [];
    this._SunamiService.getSystemDetails().subscribe(
      (data) => this.data = data,
      err => {
        this.popToast("no internet", err, this.data);
      });
  }

  createObj1(data1: any[]) {
    this.searchData = [];
    for (let key in data1) {
      this.searchData.push(data1[key].FreeImei);
    }
  }

  createObj2(data2: any[]) {
    this.customers = [];
    for (let key in data2) {
      this.customers.push(data2[key].Id);
    }
  }

  submit() {
    this.controller = [];
    if (this.imei.length > 10 && this.customer_id != "") {
      this.controller.push({ imei: this.imei, customer_id: this.customer_id, loogeduser: UserServiceService.email });
      this._SunamiService.postLinkController(this.controller).subscribe(
        (data) => this.popToastpost("results", data),
        err => {
          this.popToast("no internet", err, this.data);
        });
    }
    else {
      this.popToast("error", "Fill all fields appropriately", this.data);
    }
    this.showlinkbutton = true;
  }

  Fshowlinkbutton() {
    this.showlinkbutton = false;
  }

  CANCEL(){
    this.showlinkbutton = true;
  }

  popToastpost(t: string, d: any[]) {
    var toast: Toast = {
      type: 'error',
      title: t,
      body: d
    };
    this.toasterService.pop(toast);
    this.getSystemDetailsPerCustomer(this.customer_id);
  }

  popToast(t: string, b: string, d: any[]) {
    this.data = d;
    var toast: Toast = {
      type: 'error',
      title: t,
      body: b
    };
    this.toasterService.pop(toast);
  }

  popToast1(t: string, b: string) {
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
    this.userservice.exporttoexcel(GeneralFilterPipe.filteredArray, "linked_controllers");
  }

  unlink(){
    if(confirm(`are you sure you want to unlink this controller imei: ${this.imeitoUnlink}? this action is unreversable`)){
      this._SunamiService.unlinkController(this.imeitoUnlink).subscribe(res=>{
        this.showOptionsDiv = false;
        this.popToast1('Result', res);
      });
    } else {
      this.showOptionsDiv = false;
    }
  }

  setUnlink(value) {
    this.showOptionsDiv = true;
    this.imeitoUnlink = value;
  }
}
