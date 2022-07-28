import { AuthService } from './auth/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public isAuthenticated = false;

  private subscriptions = new Subscription();

  public constructor(private authService: AuthService) {}

  public ngOnInit(): void {
    this.authService.autoLogin();
    this.subscribeToAuth();
  }

  private subscribeToAuth() {
    this.subscriptions.add(
      this.authService.userData.subscribe((userData) => {
        this.isAuthenticated = !!userData;
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
