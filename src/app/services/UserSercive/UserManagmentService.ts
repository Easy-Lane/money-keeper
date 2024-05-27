import { Injectable, inject } from '@angular/core';
import { IUserInfo } from '../../interfaces/IUserInfo';
import {
    Auth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    UserCredential,
    updatePassword,
    updateEmail,
    reauthenticateWithCredential,
    signOut,
    EmailAuthProvider
} from '@angular/fire/auth';
import {
    Firestore,
    doc,
    collection,
    getDoc,
    getDocs,
    query,
    and,
    addDoc,
    updateDoc,
    setDoc,
    QueryFilterConstraint,
} from '@angular/fire/firestore';
import { IUserInterface } from '../../interfaces/IUserInterface';
import {
    BehaviorSubject,
    Observable,
    from,
    tap,
    map,
    switchMap,
    forkJoin,
    of,
    catchError,
} from 'rxjs';
import { IDayExpenses } from '../../interfaces/calendar/IDayExpenses';
import { Router } from '@angular/router';

@Injectable()
export class UserManagmentService implements IUserInterface {
    constructor(private router: Router) {
        if (this.isAuthorized()) this._isAuthorized$.next(true);
    }
    private Auth: Auth = inject(Auth);
    private firestore = inject(Firestore);
    private _isAuthorized$ = new BehaviorSubject<boolean>(false);
    public isAuthorized$ = this._isAuthorized$.asObservable();

    public Login(credentials: IUserInfo): Observable<UserCredential> {
        return from(
            signInWithEmailAndPassword(
                this.Auth,
                credentials.email,
                credentials.password
            )
        ).pipe(
            catchError((err) => {
                switch (err.code) {
                    case 'auth/weak-password': {
                        throw new Error('Новый пароль ненадежный.');
                    }
                    case 'auth/wrong-password': {
                        throw new Error('Введен неверный пароль');
                    }
                    case 'auth/invalid-credential': {
                        throw new Error('Неверно указаны почта или пароль');
                    }
                    case '"auth/too-many-requests"': {
                        throw new Error(
                            'Доступ временно заблокирован. Повторите попытку позже'
                        );
                    }
                    default:
                        throw new Error(
                            'Возникла непредвиденная ошибка. Повторите попытку'
                        );
                }
            }),
            switchMap((obj) => {
                return forkJoin({
                    obj: of(obj),
                    user: this.LoadUserInfo(obj.user.uid),
                });
            }),
            tap((data) => {
                this.SaveSessionInfo(data.user, data.obj.user.uid);
                this.router.navigate(['/home/calendar'], {
                    queryParams: { uid: data.obj.user.uid },
                });
            }),
            map((data) => {
                return data.obj;
            })
        );
    }

    public Register(credentials: IUserInfo): Observable<UserCredential> {
        return from(
            createUserWithEmailAndPassword(
                this.Auth,
                credentials.email,
                credentials.password
            )
        ).pipe(
            tap((obj: UserCredential) => {
                this.CreateUserInfo(obj.user.uid, credentials);
                this.SaveSessionInfo(credentials, obj.user.uid);
                this.router.navigate(['/home/calendar'], {
                    queryParams: { uid: obj.user.uid },
                });
            })
        );
    }

    public SaveSessionInfo(sessionInfo: IUserInfo, uid: string) {
        localStorage.setItem('session', JSON.stringify([uid, sessionInfo]));
    }

    public isAuthorized(): boolean {
        return localStorage.getItem('session') !== null;
    }

    public LogOut(): void {
        localStorage.removeItem('session');
        signOut(this.Auth).then(()=> {
            console.log(this.Auth.currentUser);
        });
    }

    public ChangePassword(newPassword: string): void {
        updatePassword(this.Auth.currentUser!, newPassword);
    }

    public ChangeEmail(newEmail: string): void {
        updateEmail(this.Auth.currentUser!, newEmail);
    }

    public Reauthenticate(userData: IUserInfo): Observable<UserCredential> {
        const credential = EmailAuthProvider.credential(userData.email, userData.password);
        return from(reauthenticateWithCredential(this.Auth.currentUser!, credential))
    }

    public CreateUserInfo(uid: string, user: IUserInfo): Observable<void> {
        return from(setDoc(doc(this.firestore, 'users', uid), user)).pipe(
            map((obj) => {
                return obj;
            })
        );
    }

    public LoadUserInfo(uid: string): Observable<IUserInfo> {
        return from(getDoc(doc(this.firestore, `users/${uid}`))).pipe(
            map((user) => {
                return user.data() as IUserInfo;
            })
        );
    }

    public CreateDocs(uid: string, data: IDayExpenses): Observable<string> {
        return from(
            addDoc(
                collection(this.firestore, `users/${uid}/DayExpenses/`),
                data
            )
        ).pipe(
            map((doc) => {
                return doc.id;
            })
        );
    }

    public UpdateDocs(
        uid: string,
        eid: string,
        data: IDayExpenses
    ): Observable<void> {
        return from(
            updateDoc(doc(this.firestore, `users/${uid}/DayExpenses/${eid}`), {
                expenses: data.expenses,
            })
        ).pipe(
            map((doc) => {
                return doc;
            })
        );
    }

    public GetDocsBy(
        uid: string,
        ...queryConstraints: QueryFilterConstraint[]
    ): Observable<[string, IDayExpenses][]> {
        return from(
            getDocs(
                query(
                    collection(this.firestore, `users/${uid}/DayExpenses/`),
                    and(...queryConstraints)
                )
            )
        ).pipe(
            map((obj) => {
                const data: [string, IDayExpenses][] = [];
                obj.docs.forEach((element) => {
                    data.push([element.id, element.data() as IDayExpenses]);
                });
                return data;
            })
        );
    }

    public UpdateUserInfo(uid: string, newData: IUserInfo): Observable<void> {
        return from(
            updateDoc(doc(this.firestore, `users/${uid}`), {
                username: newData.username,
                email: newData.email,
                password: newData.password,
            })
        ).pipe(
            map((user) => {
                this.SaveSessionInfo(newData, uid);
                return user;
            })
        );
    }
    public GetUserInfo(): IUserInfo {
        const storageUser = localStorage.getItem('session')!;
        return JSON.parse(storageUser)[1] as IUserInfo;
    }
}
