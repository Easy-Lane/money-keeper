import {IUserInfo} from "./IUserInfo";
import {InjectionToken} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import { IDayExpenses } from "./calendar/IDayExpenses";
import {Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword,UserCredential } from "@angular/fire/auth";
import { QueryFilterConstraint } from "@angular/fire/firestore";
export const IUserToken = new InjectionToken<IUserInterface>("Authorization error");

export interface IUserInterface {
  Login : (credentials: IUserInfo) => Observable<UserCredential>;
  LogOut : () => void;
  Register: (credentials: IUserInfo) => Observable<UserCredential>;
  SaveSessionInfo: (sessionInfo: IUserInfo,  uid:string) => void;
  isAuthorized: () => boolean;
  CreateUserInfo: (uid: string, user: IUserInfo) => Observable<void>;
  LoadUserInfo: (uid: string) =>  Observable<IUserInfo>;
  UpgradeUserInfo: (uid: string, newData: IUserInfo) =>  Observable<void>;
  GetDocsBy: (uid: string, ...queryConstraints: QueryFilterConstraint[]) => Observable<[string, IDayExpenses][]>;
  CreateDocs: (uid: string, data: IDayExpenses) => Observable<string> ;
  UpdateDocs: (uid: string,eid: string, data: IDayExpenses) => Observable<void>;
  //GetUserInfo: () => IUserInfo;
}