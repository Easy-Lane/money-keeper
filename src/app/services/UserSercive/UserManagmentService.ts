import { Injectable, inject } from '@angular/core';
import {IAuthCredentials} from "../../interfaces/IAuthCredentials";
import {Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, UserCredential, updateProfile} from "@angular/fire/auth";
import {IUserInterface} from "../../interfaces/IUserInterface";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class UserManagmentService implements  IUserInterface{

  constructor() {
    if(this.isAuthorized())
      this._isAuthorized$.next(true);
  }
  private Auth = inject(Auth);
  private _isAuthorized$ = new BehaviorSubject<boolean>(false);
  public isAuthorized$ = this._isAuthorized$.asObservable();

  public login(credentials: IAuthCredentials): Promise<UserCredential>{
    return signInWithEmailAndPassword(this.Auth,credentials.email, credentials.password);
  }

  public signOut(){
    localStorage.removeItem("session");
    this._isAuthorized$.next(false);
    //this.Auth.signOut();
  }

  public register(credentials: IAuthCredentials): Promise<UserCredential>{
    return createUserWithEmailAndPassword(this.Auth, credentials.email, credentials.password)
    .then((userCredential) => {
      updateProfile(userCredential.user, {displayName: credentials.username} );
      return userCredential;
    });
  }

  public saveSessionInfo(sessionInfo: UserCredential){
    localStorage.setItem("session", JSON.stringify(sessionInfo));
    this._isAuthorized$.next(true);
  }

  public isAuthorized(){
    return localStorage.getItem("session") !== null;
   // return this.Auth.currentUser != null; 
  }
}