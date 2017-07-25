import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-su-navbar',
  templateUrl: './su-navbar.component.html?v=${new Date().getTime()}',
  styleUrls: ['./su-navbar.component.css?v=${new Date().getTime()}']
})
export class SuNavbarComponent implements OnInit {
  email: string = "email";
  ngOnInit()
  { 
    
  }
    name: any;
    constructor(public af: AngularFire,private router: Router)
    {
    this.af.auth.subscribe(auth => 
    {
      if(auth) {
        this.name = auth;
        this.email = this.name.auth.email;
      }
    });
  }
}
