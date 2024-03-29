import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { reducers } from './store/index';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { effects } from './store/index';
import { SharedModule } from './shared/shared.module';
import { MainModule } from './main/main.module';
import { environment } from 'src/environments/environment';
import { PagesModule } from './pages/pages.module';
import { NavigationModule } from './main/navigation/navigation.module';
import { HeaderModule } from './main/header/header.module';

@NgModule({
  declarations: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({
      name: 'Ponudi devtools',
      maxAge: 25,
      logOnly: environment.production,
    }),
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    AuthModule,
    MainModule,
    PagesModule,
    NavigationModule,
    HeaderModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
