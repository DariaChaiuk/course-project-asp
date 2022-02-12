import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { PlanningPageComponent } from './planning-page/planning-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';

const routes: Routes = [
   { path: 'planning-page', component: PlanningPageComponent },
   { path: 'registration-page', component: RegistrationPageComponent},
   { path: 'login-page', component: LoginPageComponent},
   { path: 'settings-page', component: SettingsPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }