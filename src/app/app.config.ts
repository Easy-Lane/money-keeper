import {
	ApplicationConfig,
	ErrorHandler,
	importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { GlobalErrorHandlerService } from './services/global-error-handler/global-error-handler.service';
import { NzModalService } from 'ng-zorro-antd/modal';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes),
		provideClientHydration(),
		provideAnimations(),
		provideNzI18n(en_US),
		importProvidersFrom(FormsModule),
		provideAnimationsAsync(),
		provideHttpClient(),
		{ provide: ErrorHandler, useClass: GlobalErrorHandlerService },
		{ provide: NzModalService },
	],
};
