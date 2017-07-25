import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html?v=${new Date().getTime()}',
  styleUrls: ['./sidebar.component.css?v=${new Date().getTime()}']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
