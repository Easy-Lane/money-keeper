import { Inject, Injectable } from '@angular/core';

import { CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { IUserToken, IUserInterface } from '../interfaces/IUserInterface';
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(@Inject(IUserToken) private user: IUserInterface) {}

    canActivate():
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        const isAuthorized = this.user.isAuthorized();
        return isAuthorized;
    }
}
