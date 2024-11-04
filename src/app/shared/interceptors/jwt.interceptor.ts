import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, map, Observable, switchMap, take, throwError} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {AppUser} from "../models/app-user";
import {AppError} from "../errors/app-error";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  private isRefreshing = false;

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let req = request;
    return this.authService.currentUser$.pipe(take(1)).pipe(switchMap((user: AppUser | null) => {
      if (user != null && user.expires < new Date()) {
        return this.refreshToken(request, next);
      }
      return this.injectToken(request).pipe(switchMap(authRequest => {
        req = authRequest;
        return next.handle(authRequest);
      }));
    }), catchError(error => {
      if (error instanceof HttpErrorResponse && !req.url.includes('connect/token') && error.status == 401) {
        return this.refreshToken(req, next);
      }
      else if (req.url.includes('connect/token')) {
        this.authService.logout().pipe(take(1)).subscribe();
      }
      else if (error.error instanceof String || typeof error.error === 'string') {
        let appError = new AppError(error, error.error);
        return throwError(() => appError);
      }
      return throwError(error);
    }));
  }

  private refreshToken(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      return this.authService.refreshToken().pipe(switchMap(() => {
        this.isRefreshing = false;
        return this.injectToken(request);
      }), switchMap(request => {
        return next.handle(request);
      }), catchError((err) => {
        this.isRefreshing = false;
        if (request.url.includes('connect/token')) {
          // Only logout if token refresh failed
          this.authService.logout().pipe(take(1)).subscribe();
        }
        return throwError(err);
      }));
    }
    return this.injectToken(request).pipe(switchMap(() => {
      return next.handle(request);
    }));
  }

  private injectToken(request: HttpRequest<unknown>): Observable<HttpRequest<unknown>> {
    return this.authService.currentUser$.pipe(take(1)).pipe(map((user: AppUser | null) => {
      if (user != null) {
        return request.clone({setHeaders: {Authorization: `Bearer ${user?.accessToken}`}});
      }
      return request;
    }), catchError(error => {
      throw error;
    }));
  }
}
