import {Component, Input, OnInit} from '@angular/core';
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
  @Input() customer_id: string;
  data: any[] = [];
  filterQuery = '';
  rowsOnPage = 100;
  sortBy= '';
  sortOrder = '';

  constructor(private activatedRoute: ActivatedRoute, private sunamiService: SunamiserviceService, private userservice: UserServiceService) {

  }

  exporttoexcel() {
    this.userservice.exporttoexcel(GeneralFilterPipe.filteredArray, "event_logs");
  }


  ngOnInit() {
    let pathparam;
    this.activatedRoute.params.subscribe((params: Params)=>{
      pathparam = params['customer_id'];
    },error2 => {

    });

      if(this.customer_id != null && this.customer_id != undefined && this.customer_id != '') {
        this.sunamiService.eventlogsPerCustomer(this.customer_id).subscribe(res => {
          this.data = res;
        });
      } else if(pathparam == '0' || pathparam == 0) {
        this.sunamiService.eventlogs().subscribe(res => {
          this.data = res;
        });
      }
  }

}
