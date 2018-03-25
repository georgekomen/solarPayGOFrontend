import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { UserServiceService } from './user-service.service';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SunamiserviceService {
   // private url1:string = "//api.sunamiapp.net/api/customers";
   private url1:string = "//localhost:57339/api/customers";
   headers: Headers = new Headers();
   options;
   constantParams: string;
  constructor(private _http: Http) {
    this.headers.append('Accept', 'application/json');
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');
    this.options = new RequestOptions({
      headers: this.headers
    });
    this.constantParams = `user_offices=${UserServiceService.office_id}&logedinUser=${UserServiceService.email}`;
  }

  getCustomerLocations(): Observable<any[]> {
    return this._http.get(`${this.url1}/getCustomerLocations?${this.constantParams}`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  GetPaymentActiveRates(dateInterVal:any[]): Observable<any[]> {
    let bodyString = JSON.stringify(dateInterVal); // Stringify payload
    return this._http.post(`${this.url1}/GetPaymentActiveRates?${this.constantParams}`,bodyString, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  GetPaymentInactiveRates(dateInterVal:any[]): Observable<any[]> {
    let bodyString = JSON.stringify(dateInterVal); // Stringify payload
    return this._http.post(`${this.url1}/GetPaymentInactiveRates?${this.constantParams}`,bodyString, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getPaymentChart(): Observable<any[]> {
    return this._http.get(`${this.url1}/getPaymentChart?${this.constantParams}`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getPaymentSummaryReport(id: string): Observable<any[]> {
    return this._http.get(`${this.url1}/getPaymentSummaryReport?id=${id}&${this.constantParams}`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  postSMS(sms: any[]): Observable<any[]> {
    let bodyString = JSON.stringify(sms); // Stringify payload
    return this._http.post(`${this.url1}/PostSMS?${this.constantParams}`, bodyString, this.options) // ...using post request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  getmpesaPayments(): Observable<any[]> {
    return this._http.get(`${this.url1}/getmpesaPayments?${this.constantParams}`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getUnprocessedMpesaPayments(): Observable<any[]> {
    return this._http.get(`${this.url1}/getUnprocessedMpesaPayments?${this.constantParams}`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getSwitch(customer_id: string, loogeduser: string): Observable<any[]> {
    return this._http.get(`${this.url1}/getSwitch?id=${customer_id}&id1=${loogeduser}&${this.constantParams}`, this.options) // ...using post request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  getPaymentPerCustomer(id: string): Observable<any[]> {
    return this._http.get(`${this.url1}/getPaymentPerCustomer?id=${id}&${this.constantParams}`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getCustomerDetails(): Observable<any[]> {
    return this._http.get(`${this.url1}/getCustomerDetails?${this.constantParams}`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getSystemDetails(): Observable<any[]> {
    return this._http.get(`${this.url1}/getSystemDetails?${this.constantParams}`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  postAddController(controller: any[]): Observable<any[]> {
    let bodyString = JSON.stringify(controller); // Stringify payload
    return this._http.post(`${this.url1}/postAddController?${this.constantParams}`, bodyString, this.options) // ...using post request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  postLinkController(controller: any[]): Observable<any[]> {
    let bodyString = JSON.stringify(controller); // Stringify payload
    return this._http.post(`${this.url1}/postLinkController?${this.constantParams}`, bodyString, this.options) // ...using post request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  getSunamiControllers(): Observable<any[]> {
    return this._http.get(`${this.url1}/getSunamiControllers?${this.constantParams}`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getswitchlogs(): Observable<any[]> {
    return this._http.get(`${this.url1}/getswitchlogs?${this.constantParams}`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getFreeImei(): Observable<any[]> {
    return this._http.get(`${this.url1}/getFreeImei?${this.constantParams}`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getCustomersWithNoController(): Observable<any[]> {
    return this._http.get(`${this.url1}/getCustomersWithNoController?${this.constantParams}`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getIssues(): Observable<any[]> {
    return this._http.get(`${this.url1}/getIssues?${this.constantParams}`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  postNewIssues(issue: any[]): Observable<any> {
    let bodyString = JSON.stringify(issue); // Stringify payload
    return this._http.post(`${this.url1}/postNewIssues?${this.constantParams}`, bodyString, this.options) // ...using post request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  postSolveIssues(issue: any[]): Observable<any[]> {
    let bodyString = JSON.stringify(issue); // Stringify payload
    return this._http.post(`${this.url1}/postSolveIssues?${this.constantParams}`, bodyString, this.options) // ...using post request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  getUninstalledSystems(): Observable<any[]> {
    return this._http.get(`${this.url1}/getUninstalledSystems?${this.constantParams}`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  postUninstall(uninstalled: any[]): Observable<any[]> {
    let bodyString = JSON.stringify(uninstalled); // Stringify payload
    return this._http.post(`${this.url1}/postUninstall?${this.constantParams}`, bodyString, this.options) // ...using post request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  getActiveCustomersDetails(): Observable<any[]> {
    return this._http.get(`${this.url1}/getActiveCustomersDetails?${this.constantParams}`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getAllExpenses(): Observable<any[]> {
    return this._http.get(`${this.url1}/getAllExpenses?${this.constantParams}`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getExpenseCategories(): Observable<any[]> {
    return this._http.get(`${this.url1}/getExpenseCategories?${this.constantParams}`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getReceipt(id: string): Observable<string> {
    return this._http.get(`${this.url1}/getReceipt?id=${id}&${this.constantParams}`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  postExpense(uninstalled: any[]): Observable<any[]> {
    let bodyString = JSON.stringify(uninstalled); // Stringify payload
    return this._http.post(`${this.url1}/postExpense?${this.constantParams}`, bodyString, this.options) // ...using post request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  getUserNames(): Observable<any[]> {
    return this._http.get(`${this.url1}/getUserNames?${this.constantParams}`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getMessages(): Observable<any[]> {
    return this._http.get(`${this.url1}/getMessages?${this.constantParams}`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  postmakePayment(makePayment: any[]): Observable<any> {
    let bodyString = JSON.stringify(makePayment); // Stringify payload
    return this._http.post(`${this.url1}/postmakePayment?${this.constantParams}`, bodyString, this.options) // ...using post request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  getcashRecords(): Observable<any[]> {
    return this._http.get(`${this.url1}/getcashRecords?${this.constantParams}`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getbankRecords(): Observable<any[]> {
    return this._http.get(`${this.url1}/getbankRecords?${this.constantParams}`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  postNewCustomer(newcustomer: any[]): Observable<any> {
    let bodyString = JSON.stringify(newcustomer); // Stringify payload
    return this._http.post(`${this.url1}/postNewCustomer?${this.constantParams}`, bodyString, this.options) // ...using post request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  getMpesaRecords(): Observable<any[]> {
    return this._http.get(`${this.url1}/getMpesaRecords?${this.constantParams}`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getInventory(id: string): Observable<any[]> {
    return this._http.get(`${this.url1}/getInventory?id=${id}&${this.constantParams}`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getSingleCustomerDetails(id: string): Observable<any> {
    return this._http.get(`${this.url1}/getSingleCustomerDetails?id=${id}&${this.constantParams}`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  postRecordItem(newitem: any[]): Observable<any> {
    let bodyString = JSON.stringify(newitem); // Stringify payload
    return this._http.post(`${this.url1}/postRecordItem?${this.constantParams}`, bodyString, this.options) // ...using post request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  getStockDetails(id: string): Observable<any[]> {
    return this._http.get(`${this.url1}/getStockDetails?id=${id}&${this.constantParams}`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getCustomerInvoicedItems(id: string): Observable<any[]> {
    return this._http.get(`${this.url1}/getCustomerInvoicedItems?id=${id}&${this.constantParams}`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  eventlogs(): Observable<any[]> {
    return this._http.get(`${this.url1}/eventlogs?${this.constantParams}`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  unlinkController(id1: any): Observable<any> {
    let payload1 = [];
    payload1.push({id: id1, user: UserServiceService.email});
    return this._http.post(`${this.url1}/unlinkController?${this.constantParams}`,payload1, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  deleteController(id1: any): Observable<any> {
    let payload1 = [];
    payload1.push({id: id1, user: UserServiceService.email});
    return this._http.post(`${this.url1}/deleteController?${this.constantParams}`,payload1, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  postUpdateStock(update: any[]): Observable<any> {
    let bodyString = JSON.stringify(update);
    return this._http.post(`${this.url1}/postUpdateStock?${this.constantParams}`,bodyString, this.options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'server error'));
  }

  deletePayment(id1: any): Observable<any> {
    let payload1 = [];
    payload1.push({id: id1, user: UserServiceService.email});
    return this._http.post(`${this.url1}/deletePayment?${this.constantParams}`,payload1, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getInvoiceItems(): Observable<any[]> {
    return this._http.get(`${this.url1}/invoiceItems?${this.constantParams}`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  invoiceCustomer(invoice: any): Observable<any> {
    let bodyString = JSON.stringify(invoice);
    return this._http.post(`${this.url1}/invoiceCustomer?${this.constantParams}`, bodyString, this.options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'server error'));
  }

  registerAgent(update: any): Observable<any> {
    let bodyString = JSON.stringify(update);
    return this._http.post(`${this.url1}/registerAgent?${this.constantParams}`,bodyString, this.options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'server error'));
  }

  getAgents(): Observable<any[]> {
    return this._http.get(`${this.url1}/getAgents?${this.constantParams}`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getAgentSales(id): Observable<any[]> {
    return this._http.get(`${this.url1}/getAgentSales?id=${id}&${this.constantParams}`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getIssuesPerCustomer(id): Observable<any> {
    return this._http.get(`${this.url1}/getAgentSales?id=${id}&${this.constantParams}`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getSystemDetailsPerCustomer(id): Observable<any[]> {
    return this._http.get(`${this.url1}/getSystemDetailsPerCustomer?id=${id}&${this.constantParams}`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getMessagesPerCustomer(id): Observable<any[]> {
  return this._http.get(`${this.url1}/getMessagesPerCustomer?id=${id}&${this.constantParams}`, this.options)
  .map((res: Response) => res.json())
  //...errors if any
  .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
