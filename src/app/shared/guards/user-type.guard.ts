import {CanActivateFn, CanMatchFn, Router} from '@angular/router';
import {map, take} from 'rxjs';
import {UserType} from '../models/user-type';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';

export const userTypeGuard: CanMatchFn & CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const userType = route.data?.['userType'] as UserType;

  return authService.isUserType(userType).pipe(
    take(1), // Take the first value emitted
    map(isUserType => {
      if (!isUserType) {
        router.navigate(['login']);
        return false;
      }
      return true;
    })
  );
};
