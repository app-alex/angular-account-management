import { UserData, UserRole } from './user.model';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public userData = new BehaviorSubject<UserData | null>(null);

  private tokenExpirationTimeout: any;

  public constructor(private http: HttpClient, private router: Router) {}

  public signup(username: string, password: string) {
    const response = this.http.post(environment.API_URL + '/auth/signup', {
      username,
      password,
      role: 'STANDARD',
    });

    return response;
  }

  public signin(username: string, password: string) {
    return this.http
      .post<UserData>(environment.API_URL + '/auth/signin', {
        username,
        password,
      })
      .pipe(
        tap((userData) => {
          this.userData.next(userData);
          localStorage.setItem('userData', JSON.stringify(userData));

          this.autoLogout(userData.tokenExpirationDate - new Date().getTime());
        })
      );
  }

  public autoLogin() {
    if (!localStorage.getItem('userData')) {
      return;
    }

    const userData = JSON.parse(localStorage.getItem('userData')!);
    this.userData.next(userData);

    this.autoLogout(userData.tokenExpirationDate - new Date().getTime());
  }

  public logout() {
    this.userData.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');

    if (this.tokenExpirationTimeout) {
      clearTimeout(this.tokenExpirationTimeout);
    }
    this.tokenExpirationTimeout = null;
  }

  private autoLogout(expirationDuration: number) {
    this.tokenExpirationTimeout = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  public getUserRole() {
    if (!this.userData) {
      return;
    }

    const userRole: UserRole = (
      jwt_decode(this.userData.getValue()!.accessToken) as any
    ).role;

    return userRole;
  }
}
