import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { UserServiceService } from './user-service.service';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SunamiserviceService {
   private url1:string = "//api.sunamiapp.net/api/customers";
   // private url1:string = "//localhost:57339/api/customers";
   headers: Headers = new Headers();
   options;
  constructor(private _http: Http) {
    this.headers.append('Accept', 'application/json');
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');
    this.options = new RequestOptions({
      headers: this.headers
    });
  }

  getCustomerLocations(): Observable<any[]> {
    return this._http.get(`${this.url1}/getCustomerLocations/`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  GetPaymentActiveRates(dateInterVal:any[]): Observable<any[]> {
    let bodyString = JSON.stringify(dateInterVal); // Stringify payload
    return this._http.post(`${this.url1}/GetPaymentActiveRates`,bodyString, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  GetPaymentInactiveRates(dateInterVal:any[]): Observable<any[]> {
    let bodyString = JSON.stringify(dateInterVal); // Stringify payload
    return this._http.post(`${this.url1}/GetPaymentInactiveRates`,bodyString, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getPaymentChart(): Observable<any[]> {
    return this._http.get(`${this.url1}/getPaymentChart`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getPaymentSummaryReport(id: string): Observable<any[]> {
    return this._http.get(`${this.url1}/getPaymentSummaryReport?id=${id}`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  postSMS(sms: any[]): Observable<any[]> {
    let bodyString = JSON.stringify(sms); // Stringify payload
    return this._http.post(`${this.url1}/PostSMS`, bodyString, this.options) // ...using post request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  getmpesaPayments(): Observable<any[]> {
    return this._http.get(`${this.url1}/getmpesaPayments`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getUnprocessedMpesaPayments(): Observable<any[]> {
    return this._http.get(`${this.url1}/getUnprocessedMpesaPayments`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getSwitch(customer_id: string, loogeduser: string): Observable<any[]> {
    return this._http.get(`${this.url1}/getSwitch?id=${customer_id}&id1=${loogeduser}`, this.options) // ...using post request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  getPaymentPerCustomer(id: string): Observable<any[]> {
    return this._http.get(`${this.url1}/getPaymentPerCustomer?id=${id}`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getCustomerDetails(): Observable<any[]> {
    return this._http.get(`${this.url1}/getCustomerDetails`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getSystemDetails(): Observable<any[]> {
    return this._http.get(`${this.url1}/getSystemDetails`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  postAddController(controller: any[]): Observable<any[]> {
    let bodyString = JSON.stringify(controller); // Stringify payload
    return this._http.post(`${this.url1}/postAddController`, bodyString, this.options) // ...using post request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  postLinkController(controller: any[]): Observable<any[]> {
    let bodyString = JSON.stringify(controller); // Stringify payload
    return this._http.post(`${this.url1}/postLinkController`, bodyString, this.options) // ...using post request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  getSunamiControllers(): Observable<any[]> {
    return this._http.get(`${this.url1}/getSunamiControllers`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getswitchlogs(): Observable<any[]> {
    return this._http.get(`${this.url1}/getswitchlogs`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getFreeImei(): Observable<any[]> {
    return this._http.get(`${this.url1}/getFreeImei`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getCustomersWithNoController(): Observable<any[]> {
    return this._http.get(`${this.url1}/getCustomersWithNoController`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getIssues(): Observable<any[]> {
    return this._http.get(`${this.url1}/getIssues`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  postNewIssues(issue: any[]): Observable<any> {
    let bodyString = JSON.stringify(issue); // Stringify payload
    return this._http.post(`${this.url1}/postNewIssues`, bodyString, this.options) // ...using post request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  postSolveIssues(issue: any[]): Observable<any[]> {
    let bodyString = JSON.stringify(issue); // Stringify payload
    return this._http.post(`${this.url1}/postSolveIssues`, bodyString, this.options) // ...using post request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  getUninstalledSystems(): Observable<any[]> {
    return this._http.get(`${this.url1}/getUninstalledSystems`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  postUninstall(uninstalled: any[]): Observable<any[]> {
    let bodyString = JSON.stringify(uninstalled); // Stringify payload
    return this._http.post(`${this.url1}/postUninstall`, bodyString, this.options) // ...using post request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  getActiveCustomersDetails(): Observable<any[]> {
    return this._http.get(`${this.url1}/getActiveCustomersDetails`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getAllExpenses(): Observable<any[]> {
    return this._http.get(`${this.url1}/getAllExpenses`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getExpenseCategories(): Observable<any[]> {
    return this._http.get(`${this.url1}/getExpenseCategories`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getReceipt(id: string): Observable<string> {
    return this._http.get(`${this.url1}/getReceipt?id=${id}`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  postExpense(uninstalled: any[]): Observable<any[]> {
    let bodyString = JSON.stringify(uninstalled); // Stringify payload
    return this._http.post(`${this.url1}/postExpense`, bodyString, this.options) // ...using post request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  getUserNames(): Observable<any[]> {
    return this._http.get(`${this.url1}/getUserNames`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getMessages(): Observable<any[]> {
    return this._http.get(`${this.url1}/getMessages`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  postmakePayment(makePayment: any[]): Observable<any> {
    let bodyString = JSON.stringify(makePayment); // Stringify payload
    return this._http.post(`${this.url1}/postmakePayment`, bodyString, this.options) // ...using post request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  getcashRecords(): Observable<any[]> {
    return this._http.get(`${this.url1}/getcashRecords`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getbankRecords(): Observable<any[]> {
    return this._http.get(`${this.url1}/getbankRecords`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  postNewCustomer(newcustomer: any[]): Observable<any> {
    let bodyString = JSON.stringify(newcustomer); // Stringify payload
    return this._http.post(`${this.url1}/postNewCustomer`, bodyString, this.options) // ...using post request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  getMpesaRecords(): Observable<any[]> {
    return this._http.get(`${this.url1}/getMpesaRecords`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getInventory(id: string): Observable<any[]> {
    return this._http.get(`${this.url1}/getInventory?id=${id}`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getSingleCustomerDetails(id: string): Observable<any> {
    return this._http.get(`${this.url1}/getSingleCustomerDetails?id=${id}`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  postRecordItem(newitem: any[]): Observable<any> {
    let bodyString = JSON.stringify(newitem); // Stringify payload
    return this._http.post(`${this.url1}/postRecordItem`, bodyString, this.options) // ...using post request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  getStockDetails(id: string): Observable<any[]> {
    return this._http.get(`${this.url1}/getStockDetails?id=${id}`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getCustomerInvoicedItems(id: string): Observable<any[]> {
    return this._http.get(`${this.url1}/getCustomerInvoicedItems?id=${id}`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  eventlogs(): Observable<any[]> {
    return this._http.get(`${this.url1}/eventlogs`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  unlinkController(id1: any): Observable<any> {
    let payload1 = [];
    payload1.push({id: id1, user: UserServiceService.email});
    return this._http.post(`${this.url1}/unlinkController`,payload1, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  deleteController(id1: any): Observable<any> {
    let payload1 = [];
    payload1.push({id: id1, user: UserServiceService.email});
    return this._http.post(`${this.url1}/deleteController`,payload1, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  postUpdateStock(update: any[]): Observable<any> {
    let bodyString = JSON.stringify(update);
    return this._http.post(`${this.url1}/postUpdateStock`,bodyString, this.options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'server error'));
  }

  deletePayment(id1: any): Observable<any> {
    let payload1 = [];
    payload1.push({id: id1, user: UserServiceService.email});
    return this._http.post(`${this.url1}/deletePayment`,payload1, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getInvoiceItems(): Observable<any[]> {
    return this._http.get(`${this.url1}/invoiceItems`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  invoiceCustomer(invoice: any): Observable<any> {
    let bodyString = JSON.stringify(invoice);
    return this._http.post(`${this.url1}/invoiceCustomer`, bodyString, this.options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'server error'));
  }

  registerAgent(update: any): Observable<any> {
    let bodyString = JSON.stringify(update);
    return this._http.post(`${this.url1}/registerAgent`,bodyString, this.options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'server error'));
  }

  getAgents(): Observable<any[]> {
    return this._http.get(`${this.url1}/getAgents`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getAgentSales(id): Observable<any[]> {
    return this._http.get(`${this.url1}/getAgentSales?id=${id}`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getIssuesPerCustomer(id): Observable<any> {
    return this._http.get(`${this.url1}/getAgentSales?id=${id}`, this.options)
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
