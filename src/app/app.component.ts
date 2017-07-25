import { Component, OnInit } from '@angular/core';
import { ToasterService, Toast } from 'angular2-toaster';
//for clearing cache
import { Compiler } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  ngOnInit() {
  }

  constructor(private toasterService: ToasterService, private _compiler: Compiler) {
    //clear cache
    this._compiler.clearCache();
  }

  popToast() {
    var toast: Toast = {
      type: 'info',
      title: 'Here is a Toast Title',
      body: 'Here is a Toast Body'
    };
    this.toasterService.pop(toast);
  }
}