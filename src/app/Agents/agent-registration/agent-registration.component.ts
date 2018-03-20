import { Component, OnInit } from '@angular/core';
import {AgentPayload} from "../shared/AgentPayload";
import {Toast, ToasterService} from "angular2-toaster";
import {SunamiserviceService} from "../../sunamiservice.service";
import {UserServiceService} from "../../user-service.service";

@Component({
  selector: 'app-agent-registration',
  templateUrl: './agent-registration.component.html',
  styleUrls: ['./agent-registration.component.css']
})
export class AgentRegistrationComponent implements OnInit {

  agent:AgentPayload = new AgentPayload();
  constructor(private _SunamiService: SunamiserviceService, private toasterService: ToasterService) {

  }

  ngOnInit() {

  }

  submit() {
    if (this.agent.idnumber != null && this.agent.idnumber != "") {
      this._SunamiService.registerAgent(this.agent).subscribe(
        (data) => this.popToast("results", "successfully registered the agent"),
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
