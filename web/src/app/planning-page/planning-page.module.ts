import { ajax, css } from "jquery";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { PlanCardComponent } from "./plan-card/plan-card.component";
import { PlanningPageComponent } from "./planning-page.component";
import { ModalPlanCardComponent } from './modal-plan-card/modal-plan-card.component';
import { ModalStatusEditComponent } from './modal-status-edit/modal-status-edit.component';

@NgModule({
    imports: [
        ReactiveFormsModule,
        BrowserModule,
        FormsModule
    ],
    declarations: [
      PlanningPageComponent,
      PlanCardComponent,
      ModalPlanCardComponent,
      ModalStatusEditComponent, 
    ],
  })
  export class PlanningPageModule {}