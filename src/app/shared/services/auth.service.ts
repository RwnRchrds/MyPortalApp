import {Injectable} from '@angular/core';
import {TokenService} from "../api/token.service";
import {AuthenticationService} from "../api/authentication.service";
import {Router} from "@angular/router";
import {LoginModel} from "../api/models/request/login-model";
import {catchError, map, Observable, of, ReplaySubject, switchMap, take} from "rxjs";
import {TokenResponseModel} from "../api/models/response/token-response-model";
import {AppUser} from "../models/app-user";
import {UserInfoResponseModel} from "../api/models/response/user-info-response-model";
import {UserType} from "../models/user-type";
import {PermissionMode} from "../models/permission-mode";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSource: ReplaySubject<AppUser | null> = new ReplaySubject<AppUser | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private tokenService: TokenService, private authenticationService: AuthenticationService, private router: Router) {
    this.currentUserSource.next(null);
  }

  login(credentials: LoginModel): Observable<boolean> {
    return this.tokenService.getTokenWithCredentials(credentials).pipe(switchMap((token: TokenResponseModel) => {
      if (token != null) {
        sessionStorage.setItem('accessToken', token.access_token);
        sessionStorage.setItem('refreshToken', token.refresh_token);
        if (credentials.saveCredentials) {
          localStorage.setItem('accessToken', token.access_token);
          localStorage.setItem('refreshToken', token.refresh_token);
        }
        let user = new AppUser(token.access_token, token.refresh_token, credentials.saveCredentials);
        this.currentUserSource.next(user);
        return this.loadUserInfo();
      }
      return of(false);
    }));
  }

  hasPermission(requiredPermissions: number[], permissionMode: PermissionMode): Observable<boolean> {
    return this.currentUser$.pipe(take(1)).pipe(map((user: AppUser | null) => {
      // If route has no required permissions, allow the user to proceed
      if (requiredPermissions == null || requiredPermissions.length === 0){
        return true;
      }
      else {
        if (user != null) {
          return permissionMode == PermissionMode.RequireAll ?
            requiredPermissions.every(p => user.permissions.includes(p)) :
            requiredPermissions.some(p => user.permissions.includes(p));
        }
        return false;
      }
    }));
  }

  isUserType(userType: UserType): Observable<boolean> {
    return this.currentUser$.pipe(take(1)).pipe(map((user: AppUser | null) => {
      if (user != null) {
        return user.userType === userType;
      }
      return false;
    }));
  }

  private loadUserInfo(): Observable<boolean> {
    return this.currentUser$.pipe(take(1)).pipe(switchMap((user: AppUser | null) => {
      if (user != null) {
        return this.authenticationService.getUserInfo().pipe(map((result: UserInfoResponseModel) => {
          user.displayName = result.displayName;
          user.profileImage = result.profileImage;
          user.permissions = result.permissions;
          this.currentUserSource.next(user);
          return true;
        }));
      }
      return of(false);
    }));
  }

  private loadFromLocalStorage(): void {
    let accessToken = localStorage.getItem('accessToken');
    let refreshToken = localStorage.getItem('refreshToken');
    if (accessToken != null) {
      sessionStorage.setItem('accessToken', accessToken);
    }
    if (refreshToken != null) {
      sessionStorage.setItem('refreshToken', refreshToken);
    }
  }

  redirectToHome(): Observable<Promise<boolean>> {
    return this.currentUser$.pipe(take(1)).pipe(map((user: AppUser | null) => {
      if (user != null) {
        switch(user.userType) {
          case UserType.Staff:
            return this.router.navigate(['staff/home']);
          case UserType.Student:
            return this.router.navigate(['student/home']);
          case UserType.Parent:
            return this.router.navigate(['parent/home']);
        }
      }
      return this.router.navigate(['login']);
    }));
  }

  loadFromStorage(): Observable<boolean> {
    if (sessionStorage.getItem('accessToken') == null) {
      this.loadFromLocalStorage();
    }
    let accessToken = sessionStorage.getItem('accessToken');
    let refreshToken = sessionStorage.getItem('refreshToken');
    if (accessToken != null) {
      let user = new AppUser(accessToken, refreshToken, true);
      this.currentUserSource.next(user);
      return this.loadUserInfo();
    }
    return of(false);
  }

  refreshToken(): Observable<boolean> {
    return this.currentUser$.pipe(take(1)).pipe(switchMap((user: AppUser | null) => {
      if (user != null && user.refreshToken != null) {
        return this.tokenService.getTokenWithRefreshToken(user.refreshToken).pipe(map((token: TokenResponseModel) => {
          if (user.stayLoggedIn) {
            localStorage.setItem('accessToken', token.access_token);
            localStorage.setItem('refreshToken', token.refresh_token);
          }
          sessionStorage.setItem('accessToken', token.access_token);
          sessionStorage.setItem('refreshToken', token.refresh_token);
          user.updateTokens(token.access_token, token.refresh_token)
          this.currentUserSource.next(user);
          return true;
        }));
      }
      return of(false);
    }));
  }

  logout(): Observable<boolean> {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    let refreshToken = sessionStorage.getItem('refreshToken');
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    this.currentUserSource.next(null);
    if (refreshToken != null) {
      return this.tokenService.revokeRefreshToken(refreshToken).pipe(map(() => {
        this.router.navigate(['login']);
        return true;
      }), catchError(() => {
        this.router.navigate(['login']);
        return of(false);
      }));
    }
    this.router.navigate(['login']);
    return of(false);
  }

  isAuthenticated(): Observable<boolean> {
    return this.currentUser$.pipe(take(1)).pipe(map((user: AppUser | null) => {
      return user != null;
    }));
  }
}
