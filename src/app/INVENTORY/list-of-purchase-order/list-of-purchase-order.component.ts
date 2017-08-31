import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";

@Component({
  selector: 'app-list-of-purchase-order',
  templateUrl: './list-of-purchase-order.component.html',
  styleUrls: ['./list-of-purchase-order.component.css']
})
export class ListOfPurchaseOrderComponent implements OnInit {

  sortBy = '';
  private rowsOnPage = 100;
  private sortOrder = "asc";


  listOfPurchaseForm: FormGroup;
  _item_class: item_class = new item_class();
  items: FirebaseListObservable<any>;
  private url = '/'
  constructor(private db: AngularFire) {

  }

  ngOnInit() {
    //initilize form
    this.listOfPurchaseForm = new FormGroup({
      'item': new FormControl(this._item_class.item, [
        Validators.required,
        Validators.minLength(4)
      ]),
      'category': new FormControl(this._item_class.category)
    });

    //initialize firebase db
    this.items = this.db.database.list('/listOfPurchasableItems', {
      query: {
        orderByChild : 'category',
        equalTo:'Tool'
      }
    });
  }

  public save(model: item_class, isValid: boolean) {
    console.log(model, isValid);
    this.items.push(model);
  }

}

export class item_class {
  public item: string = '';
  public category: string = '';
}

