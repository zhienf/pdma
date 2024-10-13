import { CanActivateFn, Router } from '@angular/router';
import { DatabaseService } from './database.service';
import { inject } from '@angular/core';
import { map, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const db = inject(DatabaseService);

  return db.isUserAuthenticated().pipe(
    // tap to perform side effect of redirecting to login page if not authenticated
    tap((value: any) => {
      if (!value.authenticated) {
        console.log('Not authenticated');
        router.navigate(['login']);
      }
    }),
    // map to return the boolean value of authenticated
    map((value: any) => value.authenticated)
  );
};

