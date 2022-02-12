import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { RegistartionPageModule } from './registration-page/registartion-page.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PlanningPageModule } from './planning-page/planning-page.module';
import { CommonModule } from '@angular/common';
import { SettingsPageModule } from './settings-page/settings-page.module';
import { HttpReponseHandler } from './interceptors/http-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RegistartionPageModule,
    ReactiveFormsModule,
    HttpClientModule,
    PlanningPageModule,
    CommonModule,
    SettingsPageModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpReponseHandler,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
