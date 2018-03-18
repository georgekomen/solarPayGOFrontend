import { Component, OnInit } from '@angular/core';
import { SunamiserviceService } from '../sunamiservice.service';
import { paymentRatesClass, paymentRatesClassPerClient } from '../classes/paymentRates';
import { ToasterService, Toast } from 'angular2-toaster';
import { CompleterService, CompleterData } from 'ng2-completer';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {
   customer_id: string = "";
   issuearray: any[];
   data: any[];
   filterQuery = "";
   rowsOnPage = 100;
   sortOrder = "asc";
   issuesolvecomment: string = "";
   solveissuediv: boolean = false;
   Id: Number = 0;

  constructor(private _SunamiService: SunamiserviceService, private toasterService: ToasterService) {

  }


  ngOnInit(): void {
    this.getIssues();
  }

   getIssues() {
    this.data = null;
    this._SunamiService.getIssues().subscribe(
      (data) => this.data = data, //Bind to view
      err => {
        // Log errors if any
        this.popToast("no internet", err, this.data);
      });
  }

   solveIssue(s1: number) {
    this.Id = s1;
    //show div
    this.solveissuediv = true;
  }

   submitissuesolve() {
    this.issuearray = [];
    if (this.Id > 0 && this.issuesolvecomment.length > 4) {
      this.issuearray.push({ Id: this.Id, Ssolver: UserServiceService.email, Scomment: this.issuesolvecomment });
      this._SunamiService.postSolveIssues(this.issuearray).subscribe(
        (data) => this.popToastpost("results", data), //Bind to view
        err => {
          // Log errors if any
          this.popToast("no internet", err, this.data);
        });
    }
    else {
      this.popToast("error", "Make sure you write a comment on how issue was solved", this.data);
    }
    this.solveissuediv = false;
    this.issuesolvecomment = "";
  }

   cancelsubmitissuesolve() {
    //clear other fields
    this.issuesolvecomment = "";
    this.solveissuediv = false;
  }

   popToastpost(t: string, d: any[]) {
    var toast: Toast = {
      type: 'error',
      title: t,
      body: d
    };
    this.toasterService.pop(toast);
    //fetch new data afta registration
    this.getIssues();
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

   hideloader() {
    document.getElementById("loading").style.display = "none";
  }

}
