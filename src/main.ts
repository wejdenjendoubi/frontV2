/// <reference types="@angular/localize" />

import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './app/interceptors/jwt-interceptor';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    // ✅ 1. HttpClient en premier
    provideHttpClient(withInterceptorsFromDi()),

    // ✅ 2. Intercepteur après HttpClient
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },

    // ✅ 3. Modules en dernier
    importProvidersFrom(BrowserModule, AppRoutingModule),
  ]
}).catch((err) => console.error(err));
