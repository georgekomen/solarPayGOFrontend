import { Component, OnInit } from '@angular/core';
import {SunamiserviceService} from "../sunamiservice.service";
import {UserServiceService} from "../user-service.service";
import {GeneralFilterPipe} from "../general-filter.pipe";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-eventlogs',
  templateUrl: './eventlogs.component.html',
  styleUrls: ['./eventlogs.component.css']
})
export class EventlogsComponent implements OnInit {

  data: any[];
  filterQuery = '';
  rowsOnPage = 100;
  sortBy= '';
  sortOrder = '';

  constructor(private activatedRoute: ActivatedRoute, private sunamiService: SunamiserviceService, private userservice: UserServiceService) { }

  exporttoexcel() {
    this.userservice.exporttoexcel(GeneralFilterPipe.filteredArray, "event_logs");
  }

  hideloader() {
    document.getElementById("loading").style.display = "none";
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params)=>{
      const id = params['customer_id'];
      if(id != null && id != undefined && id != 0) {
        this.sunamiService.eventlogsPerCustomer(id).subscribe(res => {
          this.data = res;
        });
      } else {
        this.sunamiService.eventlogs().subscribe(res => {
          this.data = res;
        });
      }
    },error2 => {

    });
  }

}
