import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-snipper',
  templateUrl: './loading-snipper.component.html?v=${new Date().getTime()}'
})
export class LoadingSnipperComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
