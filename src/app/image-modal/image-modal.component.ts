import { Component, OnInit, Input, ViewChild, Renderer, ElementRef,ContentChildren } from '@angular/core';
import { SunamiserviceService } from '../sunamiservice.service';
import { paymentRatesClass, paymentRatesClassPerClient } from '../classes/paymentRates';
import { ToasterService, Toast } from 'angular2-toaster';
@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css']
})
export class ImageModalComponent implements OnInit {
  @Input() Cdata: any;
   data1: string;

  constructor(private _SunamiService: SunamiserviceService, private toasterService: ToasterService) {

  }

//detect any changes in bound data
  ngOnChanges(changes: any) {
    this.data1 = null;
    document.getElementById("openModalButton").click();
    this._SunamiService.getReceipt(this.Cdata).subscribe(
      (data) => this.data1 = data, //Bind to view
      err => {
        // Log errors if any
        this.popToast("error", err, err);
      });
      console.log(this.Cdata);
   }

  ngOnInit() {

  }

   popToast(t: string, b: string, d: any) {
    this.data1 = d;
    var toast: Toast = {
      type: 'error',
      title: t,
      body: b
    };

    this.toasterService.pop(toast);
  }

}
