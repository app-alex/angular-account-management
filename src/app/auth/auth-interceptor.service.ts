import { AuthService } from './auth.service';
import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom, take, exhaustMap } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.userData.pipe(
      take(1),
      exhaustMap((userData) => {
        if (!userData) {
          return next.handle(req);
        }

        const modifiedReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${userData.accessToken}`,
          },
        });

        return next.handle(modifiedReq);
      })
    );
  }
}
