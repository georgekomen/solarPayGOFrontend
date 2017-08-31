import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AppComponent } from './app.component';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { SuNavbarComponent } from './navbar/su-navbar.component';
import { MapsComponent } from './mapInventory/maps.component';
import { PaymentsComponent } from './INCOMEPAGES/payments/payments.component';
import { DataFilterPipe } from './data-filter.pipe';
import { DataTableModule } from "angular2-datatable";
import { ChartsModule } from 'ng2-charts';
import { PaymentChartComponent } from './SUMMARYPAGES/payment-chart/payment-chart.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoadingSnipperComponent } from './loading-snipper/loading-snipper.component';
import { SummaryPageComponent } from './SUMMARYPAGES/summary-page/summary-page.component';
import { routing } from './app.routing';
import { TextingModalComponent } from './texting-modal/texting-modal.component';
import { LoginComponent } from './login/login.component';
import { EmailComponent } from './email/email.component';
import { SignupComponent } from './signup/signup.component';
import { MembersComponent } from './members/members.component';
import { AuthGuard } from './auth.service';
import { ToasterModule } from 'angular2-toaster';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { MpesaPaymentsComponent } from './/INCOMEPAGES/mpesa-payments/mpesa-payments.component';
import { MpesaFilterPipe } from './mpesa-filter.pipe';
import { AllpaymentsComponent } from './INCOMEPAGES/allpayments/allpayments.component';
import { IssuesComponent } from './issues/issues.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { AddcontrollerComponent } from './addcontroller/addcontroller.component';
import { SwitchinglogsComponent } from './switchinglogs/switchinglogs.component';
import { LinkControllerComponent } from './link-controller/link-controller.component';
import { Ng2CompleterModule } from "ng2-completer";
import { IncomeTabsComponent } from './INCOMEPAGES/income-tabs/income-tabs.component';
import { SummaryTabsComponent } from './SUMMARYPAGES/summary-tabs/summary-tabs.component';
import { UninstallationsComponent } from './uninstallations/uninstallations.component';
import { SalesComponent } from './sales/sales.component';
import { MpesaExpensesComponent } from './mpesa-expenses/mpesa-expenses.component';
import { AllExpensesComponent } from './all-expenses/all-expenses.component';
import { ImageModalComponent } from './image-modal/image-modal.component';
import { UserServiceService } from './user-service.service';
import { SunamiserviceService } from './sunamiservice.service';
import { GeneralFilterPipe } from './general-filter.pipe';
import { UnprocessedMpesaComponent } from './INCOMEPAGES/unprocessed-mpesa/unprocessed-mpesa.component';
import { CashRecordsComponent } from './INCOMEPAGES/cash-records/cash-records.component';
import { MpesaRecordsComponent } from './INCOMEPAGES/mpesa-records/mpesa-records.component';
import { CsvService } from "angular2-json2csv";
import { AssetsComponent } from './assets/assets.component';
import { StocksComponent } from './INVENTORY/./stocks/stocks.component';
import { AddStockComponent } from './INVENTORY/./add-stock/add-stock.component';
import { StockDetailsComponent } from './INVENTORY/./stock-details/stock-details.component';
import { DateFilterPipe } from './date-filter.pipe';
import { BaddebtsComponent } from './INCOMEPAGES/baddebts/baddebts.component';
import { BankRecordsComponent } from './INCOMEPAGES/bank-records/bank-records.component';
import { ListOfPurchaseOrderComponent } from './INVENTORY/list-of-purchase-order/list-of-purchase-order.component';

export const firebaseConfig = {
  apiKey: "AIzaSyBGIvamMbCC3gbrPJcHVs15zC0_cPHG_L8",
  authDomain: "sunamiapp.firebaseapp.com",
  databaseURL: "https://sunamiapp.firebaseio.com",
  storageBucket: "sunamiapp.appspot.com",
  messagingSenderId: "210133962478"
};

@NgModule({
  declarations: [
    AppComponent,
    SuNavbarComponent,
    MapsComponent,
    PaymentsComponent,
    DataFilterPipe,
    PaymentChartComponent,
    SidebarComponent,
    LoadingSnipperComponent,
    SummaryPageComponent,
    TextingModalComponent,
    LoginComponent,
    EmailComponent,
    SignupComponent,
    MembersComponent,
    MpesaPaymentsComponent,
    MpesaFilterPipe,
    AllpaymentsComponent,
    IssuesComponent,
    CustomerDetailsComponent,
    AddcontrollerComponent,
    SwitchinglogsComponent,
    LinkControllerComponent,
    IncomeTabsComponent,
    SummaryTabsComponent,
    UninstallationsComponent,
    SalesComponent,
    MpesaExpensesComponent,
    AllExpensesComponent,
    ImageModalComponent,
    GeneralFilterPipe,
    UnprocessedMpesaComponent,
    CashRecordsComponent,
    MpesaRecordsComponent,
    AssetsComponent,
    StocksComponent,
    AddStockComponent,
    StockDetailsComponent,
    DateFilterPipe,
    BaddebtsComponent,
    BankRecordsComponent,
    ListOfPurchaseOrderComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DataTableModule,
    ChartsModule,
    routing,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyBsoX3FMNVz8UJKkOWIZiUvl-BMW8O2VQs' }),//google maps
    ToasterModule,
    Ng2CompleterModule
  ],
  providers: [UserServiceService, SunamiserviceService, AuthGuard, CsvService,DateFilterPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
