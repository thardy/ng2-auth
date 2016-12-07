import {Component, OnDestroy} from "@angular/core";
import {AuthService} from "./auth.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'my-header',
    template: `
       
        <header>
            <nav class="navbar navbar-default">
                <div class="container-fluid">
        
                    <ul class="nav navbar-nav">
        
                        <li><a [routerLink]="['signup']">Sign Up</a></li>
                        <li><a [routerLink]="['signin']">Sign In</a></li>
                        <li><a [routerLink]="['protected']">Protected</a></li>
        
                    </ul>
                    <ul class="nav navbar-nav navbar-right" *ngIf="isAuthenticated">
        
                        <li><a (click)="onLogout()" style="cursor: pointer;">Logout</a></li>
                    </ul>
                </div><!-- /.container-fluid -->
        
            </nav>
        
        </header>
    `
})
export class HeaderComponent implements OnDestroy {
  isAuthenticated = false;
  private subscription: Subscription;

  constructor(private authService: AuthService) {
    this.authService.isAuthenticated().subscribe(
      authStatus => this.isAuthenticated = authStatus
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // isAuthenticated() {
  //   return this.isAuthenticated;
  // }

  onLogout() {
    this.authService.logout();
  }
}
