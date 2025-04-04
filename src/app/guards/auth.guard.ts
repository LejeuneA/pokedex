import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  // inject router
  const router = inject(Router);

  // create URL for redirection
  const url = router.createUrlTree(['/login']);

  // if user not connected redirect to url else continue to the page
  return userService.isUserLoggedIn() ? true : url;
};
