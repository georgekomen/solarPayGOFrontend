import { Component, OnInit } from '@angular/core';
import { SunamiserviceService } from '../sunamiservice.service';
import { paymentRatesClass, paymentRatesClassPerClient } from '../classes/paymentRates';
import { ToasterService, Toast } from 'angular2-toaster';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { CompleterService, CompleterData } from 'ng2-completer';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  constructor(private toasterService: ToasterService) {

  }

  ngOnInit(): void {

  }

  public popToast(t: string, b: string) {
    var toast: Toast = {
      type: 'error',
      title: t,
      body: b
    };
    this.toasterService.pop(toast);
  }

  public hideloader() {
    document.getElementById("loading").style.display = "none";
  }
}
