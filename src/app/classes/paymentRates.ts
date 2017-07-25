export interface paymentRatesClass{
          totalPaid:string;
          totalInvoice:string;
          percent:string;
          clientPayRates:paymentRatesClassPerClient;
}
export interface paymentRatesClassPerClient{
          name:string;
          id:string;
          amount:number;
          invoice:number;
          percent:number;
          from:string;
          to:string;
          comment:string;
}