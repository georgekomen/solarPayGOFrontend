import { Component, OnInit } from '@angular/core';
import {Toast, ToasterService} from "angular2-toaster";
import {SunamiserviceService} from "../sunamiservice.service";
import {UserServiceService} from "../user-service.service"
import {IssuePayload} from "./shared/IssuePayload";
import {ActivatedRoute, Params} from "@angular/router";
@Component({
  selector: 'app-issue-record',
  templateUrl: './issue-record.component.html',
  styleUrls: ['./issue-record.component.css']
})
export class IssueRecordComponent implements OnInit {

  priorities:any[] = ['high','medium', 'low'];
  issue: IssuePayload = new IssuePayload();
  constructor(private activatedRoute:ActivatedRoute, private _SunamiService: SunamiserviceService, private toasterService: ToasterService) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params)=>{
      const id = params['customer_id'];
      if(id != null && id != undefined) {
        this.issue.id = id;
      }
    },error2 => {

    });
  }

  submit() {
    this.issue.reporter = UserServiceService.email;
    if (this.issue.id != null && this.issue.id != "") {
      this._SunamiService.postNewIssues([this.issue]).subscribe(
        (data) => this.popToast("results", data),
        err => {
          this.popToast("no internet", err);
        });
    } else {
      this.popToast("error", "Fill all fields appropriately");
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
