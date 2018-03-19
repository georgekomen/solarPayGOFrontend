import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {AgentSalePayload} from "../shared/AgentSalePayload";
import {SunamiserviceService} from "../../sunamiservice.service";

@Component({
  selector: 'app-agent-sales',
  templateUrl: './agent-sales.component.html',
  styleUrls: ['./agent-sales.component.css']
})
export class AgentSalesComponent implements OnInit {

  public filterQuery = "";
  public rowsOnPage = 100;
  public sortOrder = "asc";
  data: AgentSalePayload[] = [];
  constructor(private activatedRoute: ActivatedRoute, private _SunamiService: SunamiserviceService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params)=>{
      const agentcode =  params['agentcode'];
      this.getAgentSales(agentcode);
    },error2 => {

    });
  }

  getAgentSales(id) {
    this._SunamiService.getAgentSales(id).subscribe(res => {
      this.data = res;
      this.hideloader();
    });
  }

  hideloader() {
    document.getElementById("loading").style.display = "none";
  }

}
