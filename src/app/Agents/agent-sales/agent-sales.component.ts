import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-agent-sales',
  templateUrl: './agent-sales.component.html',
  styleUrls: ['./agent-sales.component.css']
})
export class AgentSalesComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params)=>{
      const agentcode =  params['agentcode'];
    },error2 => {

    });
  }

}
