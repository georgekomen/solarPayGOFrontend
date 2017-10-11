import { Component, Input } from '@angular/core';
import { SunamiserviceService } from '../sunamiservice.service';
import { UserServiceService } from '../user-service.service';
import { GeneralFilterPipe } from '../general-filter.pipe';


@Component({
  selector: 'app-texting-modal',
  templateUrl: './texting-modal.component.html',
  styleUrls: ['./texting-modal.component.css']
})
export class TextingModalComponent {
  @Input() Cdata: any[];
  private SMStext = "";
  private SMS1: any[];
  private SMSn: any[];
  private res: any[];
  private filterQuery = "";
  private rowsOnPage = 100;

  constructor(private _SunamiService: SunamiserviceService,private userservice: UserServiceService) {
  }

  ngOnInit() {
    this.getMessages();
  }
  //"Jambo " + name + "\n" + msg +"\n Kumbuka una deni ya KSH" + deni + " tafadhali lipa au tutakatiza huusiano nawe"
  private sendSMS() {
    this.SMSn = [];
    this.SMS1 = [];
    for (let key in this.Cdata) {
      this.SMSn.push({ idnumber: this.Cdata[key].Id, Invoice: this.Cdata[key].Invoice, Paid: this.Cdata[key].Amount });
    }

    this.SMS1.push({ recipients: this.SMSn, message: this.SMStext });//nested array

    this._SunamiService.postSMS(this.SMS1).subscribe(
      (res) => this.res1(res), //Bind to view
      err => {
        // Log errors if any
        console.log(err);
      });
    this.SMStext = "";

  }

  private res1(re:any){
    this.res = re
    this.getMessages();
  }

  private data: any[];

  private getMessages() {
    this.data = [];
    this._SunamiService.getMessages().subscribe(
      (data) => this.data = data, //Bind to view
      err => {
        // Log errors if any
        console.log(err);
      });
  }

  private exporttoexcel() {
        this.userservice.exporttoexcel(GeneralFilterPipe.filteredArray, "test1");
    }

}
