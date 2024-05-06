import {IAuthCredentials} from "./IAuthCredentials";
import firebase from "firebase/compat";
import {InjectionToken} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword,UserCredential } from "@angular/fire/auth";
export const IUserToken = new InjectionToken<IUserInterface>("Authorization error");

export interface IUserInterface {
  login : (credentials: IAuthCredentials) => Promise<UserCredential>;
  signOut : () => void;
  register: (credentials: IAuthCredentials) => Promise<UserCredential>;
  saveSessionInfo: (sessionInfo: UserCredential) => void;
  isAuthorized: () => boolean;
  isAuthorized$: Observable<boolean>;
}