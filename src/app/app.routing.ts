import { Routes, RouterModule } from "@angular/router";
import { MapsComponent } from './mapInventory/maps.component';
import { PaymentsComponent } from './INCOMEPAGES/payments/payments.component';
import { PaymentChartComponent } from './SUMMARYPAGES/payment-chart/payment-chart.component';
import { SummaryPageComponent } from './SUMMARYPAGES/summary-page/summary-page.component';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { MembersComponent } from './members/members.component';
import { AuthGuard } from './auth.service';
import { SignupComponent } from './signup/signup.component';
import { EmailComponent } from './email/email.component';
import { MpesaPaymentsComponent } from './INCOMEPAGES/mpesa-payments/mpesa-payments.component';
import { AllpaymentsComponent } from './INCOMEPAGES/allpayments/allpayments.component';
import { IssuesComponent } from './issues/issues.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { AddcontrollerComponent } from './addcontroller/addcontroller.component';
import { SwitchinglogsComponent } from './switchinglogs/switchinglogs.component';
import { LinkControllerComponent } from './link-controller/link-controller.component';
import { IncomeTabsComponent } from './INCOMEPAGES/income-tabs/income-tabs.component';
import { SummaryTabsComponent } from './SUMMARYPAGES/summary-tabs/summary-tabs.component';
import { UninstallationsComponent } from './uninstallations/uninstallations.component';
import { AllExpensesComponent } from './all-expenses/all-expenses.component';
import { UnprocessedMpesaComponent } from './INCOMEPAGES/unprocessed-mpesa/unprocessed-mpesa.component';
import { CashRecordsComponent } from './INCOMEPAGES/cash-records/cash-records.component';
import { MpesaRecordsComponent } from './INCOMEPAGES/mpesa-records/mpesa-records.component';
import { SalesComponent } from './sales/sales.component';
import { AssetsComponent } from './assets/assets.component';
import { StocksComponent } from './INVENTORY/./stocks/stocks.component';
import { ListOfPurchaseOrderComponent } from './INVENTORY/list-of-purchase-order/list-of-purchase-order.component';
import {EventlogsComponent} from './eventlogs/eventlogs.component';
import {MakePaymentComponent} from "./make-payment/make-payment.component"
import {InvoiceItemComponent} from "./invoice-item/invoice-item.component"
import {TextingModalComponent} from "./texting-modal/texting-modal.component";
import {UninstallCustomerComponent} from "./uninstall-customer/uninstall-customer.component";
import {IssueRecordComponent} from "./issue-record/issue-record.component";
import {AgentRegistrationComponent} from "./Agents/agent-registration/agent-registration.component";
import {AgentListComponent} from "./Agents/agent-list/agent-list.component";
import {AgentSalesComponent} from "./Agents/agent-sales/agent-sales.component";
import {SwitchingComponent} from "./switching/switching.component"

const APP_ROUTES: Routes = [
  { path: 'paymentchart', component: PaymentChartComponent, canActivate: [AuthGuard] },
  { path: 'payments', component: PaymentsComponent, canActivate: [AuthGuard] },
  { path: 'map', component: MapsComponent, canActivate: [AuthGuard] },
  { path: 'summary', component: SummaryPageComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login-email', component: EmailComponent },
  { path: 'members', component: MembersComponent, canActivate: [AuthGuard] },
  { path: 'mpesa', component: MpesaPaymentsComponent, canActivate: [AuthGuard] },
  { path: 'allpayments', component: AllpaymentsComponent, canActivate: [AuthGuard] },
  { path: 'issues', component: IssuesComponent, canActivate: [AuthGuard] },
  { path: 'customerdetails', component: CustomerDetailsComponent, canActivate: [AuthGuard] },
  { path: 'switchinglogs/:customer_id', component: SwitchinglogsComponent, canActivate: [AuthGuard] },
  { path: 'addcontroller', component: AddcontrollerComponent, canActivate: [AuthGuard] },
  { path: 'link-controller/:customer_id', component: LinkControllerComponent, canActivate: [AuthGuard] },
  { path: 'income', component: IncomeTabsComponent, canActivate: [AuthGuard] },
  { path: 'summarytabs', component: SummaryTabsComponent, canActivate: [AuthGuard] },
  { path: 'unistallation', component: UninstallationsComponent, canActivate: [AuthGuard] },
  { path: 'allexpenses', component: AllExpensesComponent, canActivate: [AuthGuard] },
  { path: 'unprocessedMpesa', component: UnprocessedMpesaComponent, canActivate: [AuthGuard] },
  { path: 'cashrecords', component: CashRecordsComponent, canActivate: [AuthGuard] },
  { path: 'mpesarecords', component: MpesaRecordsComponent, canActivate: [AuthGuard] },
  { path: 'sales', component: SalesComponent, canActivate: [AuthGuard] },
  { path: 'assets', component: AssetsComponent, canActivate: [AuthGuard] },
  { path: 'stocks', component: StocksComponent, canActivate: [AuthGuard] },
  { path: 'eventlogs/:customer_id', component: EventlogsComponent, canActivate: [AuthGuard] },
  { path: 'lpo', component: ListOfPurchaseOrderComponent, canActivate: [AuthGuard]  },
  { path: 'makepayment/:customer_id', component: MakePaymentComponent, canActivate: [AuthGuard]  },
  { path: 'invoiceitem/:customer_id', component: InvoiceItemComponent, canActivate: [AuthGuard]  },
  { path: 'textmodal/:customer_id', component: TextingModalComponent, canActivate: [AuthGuard]  },
  { path: 'uninstall/:customer_id', component: UninstallCustomerComponent, canActivate: [AuthGuard]  },
  { path: 'issuerecord/:customer_id', component: IssueRecordComponent, canActivate: [AuthGuard] },
  { path: 'agentregister', component: AgentRegistrationComponent, canActivate: [AuthGuard] },
  { path: 'agentlist', component: AgentListComponent, canActivate: [AuthGuard] },
  { path: 'agentsales/:agentcode', component: AgentSalesComponent, canActivate: [AuthGuard] },
  { path: 'switching/:customer_id', component: SwitchingComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];
//export const routing = RouterModule.forRoot(APP_ROUTES);
export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
