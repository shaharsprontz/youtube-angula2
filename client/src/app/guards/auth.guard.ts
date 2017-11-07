import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';
import { AuthService }      from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private authService: AuthService
	){}
  canActivate() {
	if (this.authService.loggedIn()){
		return true;
	}else {
		return false;
	}
  }
}