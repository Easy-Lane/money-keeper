import {Inject, Injectable} from "@angular/core";

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { IUserToken, IUserInterface } from "../interfaces/IUserInterface";
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(@Inject(IUserToken) private user: IUserInterface) {}
  
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const isAuthorized = this.user.isAuthorized();
      return isAuthorized;
    }
    
  }