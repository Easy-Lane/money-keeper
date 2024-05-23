import { Injectable, inject } from '@angular/core';
import {IUserInfo} from "../../interfaces/IUserInfo";
import {Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, UserCredential, updateProfile, updatePassword} from "@angular/fire/auth";
import { Firestore, doc, collection, getDoc, getDocs, query, where, and, addDoc, updateDoc, setDoc,QueryFilterConstraint, DocumentReference } from "@angular/fire/firestore";
import {IUserInterface} from "../../interfaces/IUserInterface";
import {BehaviorSubject,Observable,from, tap, map, delay} from "rxjs";
import { IDayExpenses } from '../../interfaces/calendar/IDayExpenses';
import { IExpensesInfo } from '../../interfaces/calendar/IExpenses';
import { Router } from '@angular/router';

@Injectable()
export class UserManagmentService implements  IUserInterface{

  constructor(
    private router: Router
  ) {

    if(this.isAuthorized())
      this._isAuthorized$.next(true);
  }
  private Auth: Auth = inject(Auth);
  private firestore = inject(Firestore);
  private _isAuthorized$ = new BehaviorSubject<boolean>(false);
  public isAuthorized$ = this._isAuthorized$.asObservable();

  public Login(credentials: IUserInfo): Observable<UserCredential>{
    return from(signInWithEmailAndPassword(this.Auth,credentials.email, credentials.password))
            .pipe(
              tap((obj) => {
                this.LoadUserInfo(obj.user.uid).subscribe((user: IUserInfo) => {
                  this.SaveSessionInfo(user, obj.user.uid)
                  this.router.navigate(["/home/calendar"], { queryParams: { "uid" : obj.user.uid}});
                })
              })
            )
  }

  public LogOut(){
    localStorage.removeItem("session");
  }

  public Register(credentials: IUserInfo): Observable<UserCredential>{
    return from(createUserWithEmailAndPassword(this.Auth, credentials.email, credentials.password))
            .pipe(
              tap((obj: UserCredential) => {
                this.CreateUserInfo(obj.user.uid, credentials)
                this.SaveSessionInfo(credentials, obj.user.uid)
                this.router.navigate(["/home/calendar"], { queryParams: { "uid" : obj.user.uid}});
              })
            )
  }

  public SaveSessionInfo(sessionInfo: IUserInfo, uid:string){
    localStorage.setItem("session", JSON.stringify([uid, sessionInfo]));
  }

  public isAuthorized(){
    return localStorage.getItem("session") !== null;
  }

  public ChangePassword(newPassword: string) {
    if (this.Auth.currentUser != null)
      updatePassword(this.Auth.currentUser, newPassword)

  }

  public CreateUserInfo(uid: string, user: IUserInfo): Observable<void> {
    return from(setDoc(doc(this.firestore,"users",uid), user))
              .pipe(
                  map((obj) => {
                      return obj
                  }
                )
              )
  }

  public LoadUserInfo(uid: string): Observable<IUserInfo> {
    return from(getDoc(doc(this.firestore, `users/${uid}`)))
              .pipe(
                map((user) => {
                  return user.data() as IUserInfo;
              }
            )
          )
  }

  public CreateDocs(uid: string, data: IDayExpenses): Observable<string> {
    return from(addDoc(collection(this.firestore, `users/${uid}/DayExpenses/`),data))
              .pipe(
                map((doc) => {
                    console.log(doc);
                    return doc.id
                }
              )
            )
  }

  public UpdateDocs(uid: string,eid: string, data: IDayExpenses): Observable<void> {
    return from(updateDoc(doc(this.firestore, `users/${uid}/DayExpenses/${eid}`), {expenses: data.expenses}))
              .pipe(
                map((doc) => {
                    return doc
                }
              )
            )
  }

  public GetDocsBy(uid: string, ...queryConstraints: QueryFilterConstraint[]): Observable<[string, IDayExpenses][]> {
    return from(getDocs(query(collection(this.firestore, `users/${uid}/DayExpenses/`), and(...queryConstraints) )))
              .pipe(
                map((obj) => {
                  const data: [string, IDayExpenses][] = [];
                  obj.docs.forEach(element => {
                    data.push([element.id,element.data() as IDayExpenses]);
                  });
                  return data
                }
              )
  )
  }

  public UpgradeUserInfo(uid: string, newData: IUserInfo):Observable<void> {
    return from(updateDoc(doc(this.firestore, `users/${uid}`), {"username" : newData.username, "email" : newData.email, "password" : newData.password}))
            .pipe(
              map((user) => {
                  return user
              }
            )
          )
  }
  public GetUserInfo(): IUserInfo | null {
    const storageUser = localStorage.getItem("session");
    if (!storageUser)
      return null
    return JSON.parse(storageUser)[1] as IUserInfo;

   }
}
