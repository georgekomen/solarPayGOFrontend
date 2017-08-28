import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { UserServiceService } from './user-service.service';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SunamiserviceService {
    //mark:any[];
    private headers: Headers = new Headers();
    private options;
    constructor(private _http: Http) {
        this.headers.append('Accept', 'application/json');
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Access-Control-Allow-Origin', '*');
        this.options = new RequestOptions({
            headers: this.headers
        });
    }

    getCustomerLocations(): Observable<any[]> {
        return this._http.get('//api.sunamiapp.net/api/customers/getCustomerLocations/', this.options)
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    GetPaymentActiveRates(): Observable<any[]> {

        return this._http.get('//api.sunamiapp.net/api/customers/GetPaymentActiveRates/', this.options)
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    GetPaymentInactiveRates(): Observable<any[]> {
        return this._http.get('//api.sunamiapp.net/api/customers/GetPaymentInactiveRates/', this.options)
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getPaymentChart(): Observable<any[]> {
        return this._http.get('//api.sunamiapp.net/api/customers/getPaymentChart/', this.options)
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getPaymentSummaryReport(id: string): Observable<any[]> {
        return this._http.get('//api.sunamiapp.net/api/customers/getPaymentSummaryReport?id=' + id, this.options)
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    /*gettestdata(): Observable<any[]>
    {
        return this._http.get('http://localhost:4200/testdata/payrates.json',this.options)
       .map((res:Response) => res.json())
                           //...errors if any
                           .catch((error:any) => Observable.throw(error.json().error || 'Server error')); 
    }*/

    postSMS(sms: any[]): Observable<any[]> {
        let bodyString = JSON.stringify(sms); // Stringify payload
        return this._http.post('//api.sunamiapp.net/api/customers/PostSMS/', bodyString, this.options) // ...using post request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }

    getmpesaPayments(): Observable<any[]> {
        return this._http.get('//api.sunamiapp.net/api/customers/getmpesaPayments/', this.options)
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getUnprocessedMpesaPayments(): Observable<any[]> {
        return this._http.get('//api.sunamiapp.net/api/customers/getUnprocessedMpesaPayments/', this.options)
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getSwitch(customer_id: string, loogeduser: string): Observable<any[]> {
        return this._http.get('//api.sunamiapp.net/api/customers/getSwitch?id=' + customer_id + "&id1=" + loogeduser, this.options) // ...using post request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }

    getPaymentPerCustomer(id: string): Observable<any[]> {
        return this._http.get('//api.sunamiapp.net/api/customers/getPaymentPerCustomer?id=' + id, this.options)
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getCustomerDetails(): Observable<any[]> {
        return this._http.get('//api.sunamiapp.net/api/customers/getCustomerDetails/', this.options)
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getSystemDetails(): Observable<any[]> {
        return this._http.get('//api.sunamiapp.net/api/customers/getSystemDetails/', this.options)
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    postAddController(controller: any[]): Observable<any[]> {
        let bodyString = JSON.stringify(controller); // Stringify payload
        return this._http.post('//api.sunamiapp.net/api/customers/postAddController/', bodyString, this.options) // ...using post request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }

    postLinkController(controller: any[]): Observable<any[]> {
        let bodyString = JSON.stringify(controller); // Stringify payload
        return this._http.post('//api.sunamiapp.net/api/customers/postLinkController/', bodyString, this.options) // ...using post request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }

    getSunamiControllers(): Observable<any[]> {
        return this._http.get('//api.sunamiapp.net/api/customers/getSunamiControllers/', this.options)
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getswitchlogs(): Observable<any[]> {
        return this._http.get('//api.sunamiapp.net/api/customers/getswitchlogs/', this.options)
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getFreeImei(): Observable<any[]> {
        return this._http.get('//api.sunamiapp.net/api/customers/getFreeImei/', this.options)
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getCustomersWithNoController(): Observable<any[]> {
        return this._http.get('//api.sunamiapp.net/api/customers/getCustomersWithNoController/', this.options)
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getIssues(): Observable<any[]> {
        return this._http.get('//api.sunamiapp.net/api/customers/getIssues/', this.options)
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    postNewIssues(issue: any[]): Observable<any[]> {
        let bodyString = JSON.stringify(issue); // Stringify payload
        return this._http.post('//api.sunamiapp.net/api/customers/postNewIssues/', bodyString, this.options) // ...using post request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }

    postSolveIssues(issue: any[]): Observable<any[]> {
        let bodyString = JSON.stringify(issue); // Stringify payload
        return this._http.post('//api.sunamiapp.net/api/customers/postSolveIssues/', bodyString, this.options) // ...using post request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }

    getUninstalledSystems(): Observable<any[]> {
        return this._http.get('//api.sunamiapp.net/api/customers/getUninstalledSystems/', this.options)
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    postUninstall(uninstalled: any[]): Observable<any[]> {
        let bodyString = JSON.stringify(uninstalled); // Stringify payload
        return this._http.post('//api.sunamiapp.net/api/customers/postUninstall/', bodyString, this.options) // ...using post request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }

    getActiveCustomersDetails(): Observable<any[]> {
        return this._http.get('//api.sunamiapp.net/api/customers/getActiveCustomersDetails/', this.options)
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getAllExpenses(): Observable<any[]> {
        return this._http.get('//api.sunamiapp.net/api/customers/getAllExpenses/', this.options)
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getExpenseCategories(): Observable<any[]> {
        return this._http.get('//api.sunamiapp.net/api/customers/getExpenseCategories/', this.options)
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getReceipt(id: string): Observable<string> {
        return this._http.get('//api.sunamiapp.net/api/customers/getReceipt?id=' + id, this.options)
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    postExpense(uninstalled: any[]): Observable<any[]> {
        let bodyString = JSON.stringify(uninstalled); // Stringify payload
        return this._http.post('//api.sunamiapp.net/api/customers/postExpense/', bodyString, this.options) // ...using post request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }

    getUserNames(): Observable<any[]> {
        return this._http.get('//api.sunamiapp.net/api/customers/getUserNames/', this.options)
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getMessages(): Observable<any[]> {
        return this._http.get('//api.sunamiapp.net/api/customers/getMessages/', this.options)
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    postmakePayment(makePayment: any[]): Observable<any> {
        let bodyString = JSON.stringify(makePayment); // Stringify payload
        return this._http.post('//api.sunamiapp.net/api/customers/postmakePayment/', bodyString, this.options) // ...using post request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }

    getcashRecords(): Observable<any[]> {
        return this._http.get('//api.sunamiapp.net/api/customers/getcashRecords/', this.options)
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

     getbankRecords(): Observable<any[]> {
        return this._http.get('//api.sunamiapp.net/api/customers/getbankRecords/', this.options)
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    postNewCustomer(newcustomer: any[]): Observable<any> {
        let bodyString = JSON.stringify(newcustomer); // Stringify payload
        return this._http.post('//api.sunamiapp.net/api/customers/postNewCustomer/', bodyString, this.options) // ...using post request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }

    getMpesaRecords(): Observable<any[]> {
        return this._http.get('//api.sunamiapp.net/api/customers/getMpesaRecords/', this.options)
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getInventory(id: string): Observable<any[]> {
        return this._http.get('//api.sunamiapp.net/api/customers/getInventory?id=' + id, this.options)
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    postRecordItem(newitem: any[]): Observable<any> {
        let bodyString = JSON.stringify(newitem); // Stringify payload
        return this._http.post('//api.sunamiapp.net/api/customers/postRecordItem/', bodyString, this.options) // ...using post request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }

    getStockDetails(id: string): Observable<any[]> {
        return this._http.get('//api.sunamiapp.net/api/customers/getStockDetails?id=' + id, this.options)
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    unlinkController(id1: any): Observable<any> {
        let payload1 = [];
        payload1.push({id: id1, user: UserServiceService.email});
        return this._http.get('//api.sunamiapp.net/api/customers/unlinkController?id=' + payload1, this.options)
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    postUpdateStock(update: any[]): Observable<any> {
        let bodyString = JSON.stringify(update);
        return this._http.post('//api.sunamiapp.net/api/customers/postUpdateStock/', bodyString, this.options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'server error'));
    }

    deletePayment(id1: any): Observable<any> {
        let payload1 = [];
        payload1.push({id: id1, user: UserServiceService.email});
        return this._http.get('//api.sunamiapp.net/api/customers/deletePayment?id=' + payload1, this.options)
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}
