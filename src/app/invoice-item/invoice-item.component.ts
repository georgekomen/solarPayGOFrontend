import {Component, Input, OnInit} from '@angular/core';
import {SunamiserviceService} from "../sunamiservice.service";
import {Toast, ToasterService} from "angular2-toaster";
import {UserServiceService} from "../user-service.service";
import {InvoiceItem} from "./shared/InvoiceItem";
import {Packages} from "../customer-details/shared/invoiceItem";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-invoice-item',
  templateUrl: './invoice-item.component.html',
  styleUrls: ['./invoice-item.component.css']
})
export class InvoiceItemComponent implements OnInit {
  invoiceItems: Packages[] = [];
  selectedInvoiceItem: Packages;
  invoice: InvoiceItem;
  invoicedItems: InvoiceItem[] = [];
  @Input()
  customer_id;

  constructor(private activatedRoute: ActivatedRoute, private _SunamiService: SunamiserviceService, private toasterService: ToasterService, private userservice: UserServiceService) {

  }

  ngOnInit() {
    this.invoice = new InvoiceItem();
    this.invoice.customerId = this.customer_id;
    this.activatedRoute.params.subscribe((params: Params)=>{
      this.invoice.customerId = params['customer_id'];
    },error2 => {

    });
    this.getInvoiceItems();
    this.getCustomerInvoicedItems();
  }

  getInvoiceItems() {
    this._SunamiService.getInvoiceItems().subscribe(res => {
      this.invoiceItems = res;
    });
  }

  getCustomerInvoicedItems() {
    this._SunamiService.getCustomerInvoicedItems(this.invoice.customerId).subscribe(res => {
      this.invoicedItems = res;
    });
  }

  invoiceCustomer() {
    this.invoice.loogedUser = UserServiceService.email;
    this.invoice.item = this.selectedInvoiceItem.Item;
    if (confirm('are you sure you want to proceed?')) {
      this._SunamiService.invoiceCustomer([this.invoice]).subscribe(res => {
        this.popToast("Result", res);
      }, error2 => {
        this.popToast("Error", error2);
      });
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
