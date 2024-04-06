import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if (!authService.isLoggedIn) {
    // Si el usuario no está autenticado, redirigir a la página de inicio de sesión
    router.navigate(['/login']);
    return false;
  }
  return true;
};
