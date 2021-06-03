import { AuthenticationService } from './authentication-service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot ,Router  } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public authenticationService: AuthenticationService,
    public router: Router
) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.authenticationService.isLoggedIn !== true) {
      this.router.navigate(['app-registro-usuario'])
    }
    return true;
  }

}
