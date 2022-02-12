import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RegistrationPageComponent } from "./registration-page.component";

@NgModule({
    imports: [
      ReactiveFormsModule,
      BrowserModule,
      FormsModule,
    ],
    declarations: [
      RegistrationPageComponent,
    ],
  })
  export class RegistartionPageModule {
  }