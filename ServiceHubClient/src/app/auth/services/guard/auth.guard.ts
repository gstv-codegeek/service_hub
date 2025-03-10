import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {StorageService} from '../storage/storage.service';

export const authGuard: CanActivateFn = (route, state) => {


  const router: Router = inject(Router);

  if (StorageService.isTokenNotValid()){
    router.navigateByUrl("/home");
    return false;
  }
  return true;
};
