import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../router.animations';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: { '[@moveIn]': '' }
})
export class MembersComponent implements OnInit {
   email: string = "email";
   name: any;
   user: UserServiceService;
   state ="";


  constructor(public af: AngularFire, private router: Router, private user1: UserServiceService) {

  }

  ngOnInit() {
    this.user = this.user1;
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.name = auth;
        this.email = this.name.auth.email;
        this.user.setUserVars(this.email);
      }
    });
  }

   logout() {
    UserServiceService.allowed = false;
    this.af.auth.logout();
    console.log('logged out');
    this.router.navigateByUrl('/login');
  }
}
