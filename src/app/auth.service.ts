import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFireAuth, AngularFire, AuthProviders, AuthMethods } from "angularfire2/angularfire2";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { ToasterService, Toast } from 'angular2-toaster';
import { UserServiceService } from './user-service.service';

@Injectable()

export class AuthGuard implements CanActivate {
   user: UserServiceService;
   toasterService: ToasterService;
   email: string = "email";
   name: any;
   activeUrl1: string;

  constructor(private auth: AngularFireAuth, private router: Router, toasterService: ToasterService, private user1: UserServiceService) {
    this.user = user1;
    this.toasterService = toasterService;
    this.auth.subscribe(auth => {
      if (auth) {
        this.name = auth;
        this.email = this.name.auth.email;
        this.user.setUserVars(this.email);
      }
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return Observable.from(this.auth)
      .take(1)
      .map(state => !!state)
      .do(authenticated => {
        this.activeUrl1 = route.url.toString();

        if (!authenticated) {
          this.popToast('You need to be logged in to access this page', 'Access restricted');
          this.router.navigate(['/login']);
        }
        if (UserServiceService.allowed == true) {

          //filter users according to level --user access to routes filtering
           //board - 10, admin - 9, manager - 8, accountant - 7, operations - 6, sales - 5, technician - 4
          if (this.activeUrl1 == "income") {
            if (UserServiceService.level < 2) {
              this.popToast("You don't have clearance to access this page", "Restricted access");
              this.router.navigate([this.router.url]);
            }
          }
          if (this.activeUrl1 == "allexpenses") {
            if (UserServiceService.level < 3) {
              this.popToast("You don't have clearance to access this page", "Restricted access");
              this.router.navigate([this.router.url]);
            }
          }
          if (this.activeUrl1 == "summarytabs") {
            if (UserServiceService.level < 2) {
              this.popToast("You don't have clearance to access this page", "Restricted access");
              this.router.navigate([this.router.url]);
            }
          }
          if (this.activeUrl1 == "link-controller") {
            if (UserServiceService.level < 2) {
              this.popToast("You don't have clearance to access this page", "Restricted access");
              this.router.navigate([this.router.url]);
            }
          }
          if (this.activeUrl1 == "unistallation") {
            if (UserServiceService.level < 2) {
              this.popToast("You don't have clearance to access this page", "Restricted access");
              this.router.navigate([this.router.url]);
            }
          }
          if (this.activeUrl1 == "addcontroller") {
            if (UserServiceService.level < 2) {
              this.popToast("You don't have clearance to access this page", "Restricted access");
              this.router.navigate([this.router.url]);
            }
          }
          if (this.activeUrl1 == "customerdetails") {
            if (UserServiceService.level < 2) {
              this.popToast("You don't have clearance to access this page", "Restricted access");
              this.router.navigate([this.router.url]);
            }
          }
          if (this.activeUrl1 == "map") {
            if (UserServiceService.level < 2) {
              this.popToast("You don't have clearance to access this page", "Restricted access");
              this.router.navigate([this.router.url]);
            }
          }
          if (this.activeUrl1 == "issues") {
            if (UserServiceService.level < 2) {
              this.popToast("You don't have clearance to access this page", "Restricted access");
              this.router.navigate([this.router.url]);
            }
          }
          if (this.activeUrl1 == "switchinglogs") {
            if (UserServiceService.level < 2) {
              this.popToast("You don't have clearance to access this page", "Restricted access");
              this.router.navigate([this.router.url]);
            }
          }
          if (this.activeUrl1 == "sales") {
            if (UserServiceService.level < 2) {
              this.popToast("You don't have clearance to access this page", "Restricted access");
              this.router.navigate([this.router.url]);
            }
          }
          if (this.activeUrl1 == "assets") {
            if (UserServiceService.level < 2) {
              this.popToast("You don't have clearance to access this page", "Restricted access");
              this.router.navigate([this.router.url]);
            }
          }

        }
        else if (UserServiceService.allowed == false) {
          this.popToast("You don't have clearance to access this page", "Access restricted");
          this.router.navigate([this.router.url]);
        }
      })
  }

   popToast(msg: any, title: any) {
    var toast: Toast = {
      type: 'info',
      title: title,
      body: msg
    };
    this.toasterService.pop(toast);
  }
}
