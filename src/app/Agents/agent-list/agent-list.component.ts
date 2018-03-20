import { Component, OnInit } from '@angular/core';
import {SunamiserviceService} from "../../sunamiservice.service";
import {Toast, ToasterService} from "angular2-toaster";
import {UserServiceService} from "../../user-service.service";
import {GeneralFilterPipe} from "../../general-filter.pipe";
import {AgentPayload} from "../shared/AgentPayload";
import {Router} from "@angular/router";

@Component({
  selector: 'app-agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.css']
})
export class AgentListComponent implements OnInit {

  public data: AgentPayload[] = [];
  public filterQuery = "";
  public rowsOnPage = 100;
  public sortOrder = "asc";

  constructor(private router: Router, private _SunamiService: SunamiserviceService, private toasterService: ToasterService,private userservice: UserServiceService) {

  }

  getAgentsales(value){
    this.router.navigate(['agentsales', value]);
  }

  ngOnInit(): void {
    this.getAgents();
  }

  registerNewAgent(){
    this.router.navigate(['agentregister']);
  }

  getAgents() {
    this._SunamiService.getAgents().subscribe(
      (data) => {
        this.data = data;
        this.hideloader();
      },
      err => {
        this.popToast("no internet", err);
      });
  }

  public popToast(t: string, b: string) {
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
    this.userservice.exporttoexcel(GeneralFilterPipe.filteredArray, "agent_list");
  }
}
