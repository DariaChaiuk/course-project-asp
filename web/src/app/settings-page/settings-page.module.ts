import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsPageComponent } from './settings-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { PasswordResetModalComponent } from './password-reset-modal/password-reset-modal.component';



@NgModule({
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
  ],
  declarations: [
    SettingsPageComponent,
    PasswordResetModalComponent,
  ],
})
export class SettingsPageModule { }
