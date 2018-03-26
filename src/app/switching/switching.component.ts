import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-switching',
  templateUrl: './switching.component.html',
  styleUrls: ['./switching.component.css']
})
export class SwitchingComponent implements OnInit {
  customer_id: string;
  eventlogs: boolean =true;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params)=>{
      this.customer_id = params['customer_id'];
    },error2 => {

    });
  }

}
