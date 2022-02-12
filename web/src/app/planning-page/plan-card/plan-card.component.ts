import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Plan } from 'src/app/models/plan.inteface';
import { Status } from 'src/app/models/status.interface';

@Component({
  selector: 'app-plan-card',
  templateUrl: './plan-card.component.html',
  styleUrls: ['./plan-card.component.css']
})
export class PlanCardComponent {

  constructor() { }

  @Input() statuses: Status[] | undefined = [];
  @Input() plan: Plan | undefined;
  @Output() statusChanged = new EventEmitter<Status>();
  @Output() delete = new EventEmitter();

  onChange(ev: any){
    const selected = this.statuses?.find(i => i.id == ev.target.value);
    event?.stopImmediatePropagation();
    this.statusChanged.emit(selected);
  }

  deleteIcon(){
    event?.stopImmediatePropagation();
    this.delete.emit();
  }

}
