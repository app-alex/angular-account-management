import { UserData } from '../user.model';
import { AuthService } from '../auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const userData = this.authService.userData.getValue();

    if (router.url === '/auth') {
      if (userData) return this.router.createUrlTree(['/']);
      return true;
    }
    if (userData) {
      return true;
    }
    return this.router.createUrlTree(['/auth']);
  }
}
