import { ApplicationConfig, InjectionToken, importProvidersFrom, inject  } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import {firebaseConfig } from '../environments/firebase'
import {
  ScreenTrackingService,
  UserTrackingService,
  getAnalytics,
  provideAnalytics,
} from '@angular/fire/analytics';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { IUserToken } from './interfaces/IUserInterface';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {provideAnimations} from "@angular/platform-browser/animations";
import { UserManagmentService } from './services/UserSercive/UserManagmentService';
import { Observable } from 'rxjs';
import { IUserInfo } from './interfaces/IUserInfo';
const User: InjectionToken<Observable<IUserInfo>> = new InjectionToken<Observable<IUserInfo>>('Token');
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
    provideClientHydration(), 
    provideAnimations(),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideAuth(() => getAuth()),
      provideFirestore(() => getFirestore()),
      provideStorage(() => getStorage())
    ]),
    { provide: IUserToken, useClass: UserManagmentService },
    { provide: User, useFactory: () => { 
      const UserService = inject(IUserToken);
      return UserService.CreateDocs
    } 
  },
    AuthGuard
  ]
};
