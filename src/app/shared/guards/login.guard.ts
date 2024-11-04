import { CanMatchFn } from '@angular/router';
import {map, take} from 'rxjs';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';

export const loginGuard: CanMatchFn = () => {
  console.log("Checking credentials.");
  const authService = inject(AuthService); // Inject AuthService
  return authService.currentUser$.pipe(
    take(1),
    map(user => {
      if (user) {
        // If the user is logged in, redirect to home
        authService.redirectToHome().subscribe();
        return false;
      }
      return true;
    })
  );
};
