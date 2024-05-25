import {
    ApplicationConfig,
    InjectionToken,
    inject,
    ErrorHandler,
    importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { firebaseConfig } from '../environments/firebase';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { IUserToken } from './interfaces/IUserInterface';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { UserManagmentService } from './services/UserSercive/UserManagmentService';
import { Observable } from 'rxjs';
import { IUserInfo } from './interfaces/IUserInfo';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { GlobalErrorHandlerService } from './services/global-error-handler/global-error-handler.service';
import { NzModalService } from 'ng-zorro-antd/modal';

export const User: InjectionToken<IUserInfo> = new InjectionToken<
    Observable<IUserInfo>
>('Token');

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideClientHydration(),
        provideAnimations(),
        importProvidersFrom([
            provideFirebaseApp(() => initializeApp(firebaseConfig)),
            provideAuth(() => getAuth()),
            provideFirestore(() => getFirestore()),
            provideStorage(() => getStorage()),
        ]),
        { provide: IUserToken, useClass: UserManagmentService },
        {
            provide: User,
            useFactory: () => {
                const UserService = inject(IUserToken);
                return UserService.GetUserInfo();
            },
        },
        provideNzI18n(en_US),
        importProvidersFrom(FormsModule),
        provideAnimationsAsync(),
        provideHttpClient(),
        { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
        { provide: NzModalService },
        AuthGuard, provideAnimationsAsync(),
    ],
};
