import { Routes, RouterModule } from "@angular/router";
import { SuNavbarComponent } from './navbar/su-navbar.component';
import { MapsComponent } from './mapInventory/maps.component';
import { PaymentsComponent } from './INCOMEPAGES/payments/payments.component';
import { DataFilterPipe } from './data-filter.pipe';
import { DataTableModule } from "angular2-datatable";
import { PaymentChartComponent } from './SUMMARYPAGES/payment-chart/payment-chart.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoadingSnipperComponent } from './loading-snipper/loading-snipper.component';
import { SummaryPageComponent } from './SUMMARYPAGES/summary-page/summary-page.component';
import { ModuleWithProviders } from '@angular/core';
import { AppComponent } from './app.component';
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
  { path: 'switchinglogs', component: SwitchinglogsComponent, canActivate: [AuthGuard] },
  { path: 'addcontroller', component: AddcontrollerComponent, canActivate: [AuthGuard] },
  { path: 'link-controller', component: LinkControllerComponent, canActivate: [AuthGuard] },
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
  { path: '**', redirectTo: '' }
];
//export const routing = RouterModule.forRoot(APP_ROUTES);
export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);