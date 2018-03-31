import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ToasterService, Toast } from 'angular2-toaster';
import { GeneralFilterPipe } from "app/general-filter.pipe";
declare let jsPDF;
import { CsvService } from "angular2-json2csv";
import {SunamiserviceService} from "./sunamiservice.service";

@Injectable()

export class UserServiceService {
  public static data: any[];
  public static allowed: boolean = false;
  public static level: number = 0;
  public static email: string;
  public static name2: string = "";
  public static office_id: number[] = [];
  public static currency: string;
   _http: Http;
   toasterService: ToasterService;
   private url1:string = "//localhost:57339/api/customers";
   // private url1:string = "//api.sunamiapp.net/api/customers";

  constructor(private ToasterService: ToasterService, _Http: Http, private _csvService: CsvService) {
    this.toasterService = ToasterService;
    this._http = _Http;
  }

  public getdate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    return (yyyy + "-" + this.pad(mm) + "-" + this.pad(dd));
  }

   pad(n) {
    return (n < 10) ? ("0" + n) : n;
  }

  public setName(name1: string) {
    UserServiceService.name2 = name1;
    //this.popToast("email", name1);
  }

  public setUserVars(email1: string) {
    //this.popToast("email", email1);
    UserServiceService.email = email1;
    this.getUser(email1).subscribe(
      (data) => this.setUser(data), //Bind to view
      err => {
        // Log errors if any
        console.log(err);
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

  public setUser(data1: any[]) {
    try {
      UserServiceService.data = data1;
      for (let key in UserServiceService.data) {
        UserServiceService.allowed = UserServiceService.data[key].allowed;
        UserServiceService.level = parseInt(UserServiceService.data[key].level);
        UserServiceService.office_id = UserServiceService.data[key].office_id;
        UserServiceService.currency = UserServiceService.data[key].currency;
        console.log(UserServiceService.allowed);
        console.log(UserServiceService.level);
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  public getUser(email2: string): Observable<any[]> {
    const headers: Headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    const options = new RequestOptions({
      headers: headers
    });
    return this._http.get(`${this.url1}/getUser?id=${email2}&logedinUser=${email2}`, options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public genPDFpg(div:any) {
    const elementToPrint = document.getElementById(div);
    let pdf = new jsPDF('p', 'pt', 'a4');
    let options = {
      pagesplit: true,
      background: '#fff'
    };
    pdf.addHTML(elementToPrint, 0, 0, options, () => {
      pdf.save("test1.pdf");
    });
  }

  public exporttoexcel(data:any,name:any) {
    this._csvService.download(data, 'Filename');
  }

  public genPDFpgs(canvasObj, fileName, callback) {
    var pdf = new jsPDF('l', 'pt', 'a4'),
      pdfConf = {
        pagesplit: true,
        background: '#fff'
      };
    document.body.appendChild(canvasObj); //appendChild is required for html to add page in pdf
    pdf.addHTML(canvasObj, 0, 0, pdfConf, function () {
      document.body.removeChild(canvasObj);
      pdf.addPage();
      pdf.save(fileName + '.pdf');
      callback();
    });
  }

  public print1(div:any) {
    const elementToPrint = document.getElementById(div);
    this.genPDFpgs(elementToPrint, 'printedPDF', function () {
      alert('PDF saved');
    });
  }

}
