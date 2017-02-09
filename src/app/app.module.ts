import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { SuNavbarComponent } from './su-navbar.component';
import { MapsComponent } from './maps.component';

@NgModule({
  declarations: [
    AppComponent,
    SuNavbarComponent,
    MapsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
    apiKey: 'AIzaSyBsoX3FMNVz8UJKkOWIZiUvl-BMW8O2VQs'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
