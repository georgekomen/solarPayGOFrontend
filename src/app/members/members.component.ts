import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../router.animations';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html?v=${new Date().getTime()}',
  styleUrls: ['./members.component.css?v=${new Date().getTime()}'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: { '[@moveIn]': '' }
})
export class MembersComponent implements OnInit {
  private email: string = "email";
  private name: any;
  private user: UserServiceService;
  private state ="";
  
  ngOnInit() {

  }
  constructor(public af: AngularFire, private router: Router, private user1: UserServiceService) {
    this.user = user1;
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.name = auth;
        this.email = this.name.auth.email;
        this.user.setUserVars(this.email);
      }
    });
  }

  private logout() {
    UserServiceService.allowed = false;
    this.af.auth.logout();
    console.log('logged out');
    this.router.navigateByUrl('/login');
  }
}
