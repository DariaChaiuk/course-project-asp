import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Plan } from 'src/app/models/plan.inteface';
import { Status } from 'src/app/models/status.interface';

@Component({
  selector: 'app-modal-plan-card',
  templateUrl: './modal-plan-card.component.html',
  styleUrls: ['./modal-plan-card.component.css']
})
export class ModalPlanCardComponent implements OnInit, OnChanges {

  constructor () { }

  ngOnChanges(changes: SimpleChanges): void {
    this.plan = {
      id: this.plan?.id ? this.plan.id : 0,
      title: this.plan?.title? this.plan?.title : '',
      description: this.plan?.description? this.plan?.description : '',
      statusId: this.plan?.statusId ? this.plan?.statusId : 1,
      createdDate: this.plan?.createdDate ? this.plan?.createdDate : new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())),
      userId: +(localStorage.getItem('user_id'))!
    }

    this.form.controls["title"].setValue(this.plan?.title);
    this.form.controls["description"].setValue(this.plan?.description);
    this.form.controls["statusIndex"].setValue(this.plan?.statusId);
  }

  form: FormGroup = new FormGroup({
    title: new FormControl(),
    description: new FormControl(),
    statusIndex: new FormControl(),
  });
  @Input() statuses: Status[] | undefined = [];
  @Input() plan: Plan | undefined;
  @Input() isVisible : boolean = false ;
  @Output() modalClosed = new EventEmitter<void>();
  @Output() modalClosedWithEdit = new EventEmitter<Plan>();
  
  ngOnInit() {}
  
  close(){
    this.plan = undefined;
    this.modalClosed.emit();
  }

  closeWithEdit(){

    let entity: Plan = {
      id: this.plan?.id ? this.plan.id : 0,
      title: this.form.get('title')?.value,
      description: this.form.get('description')?.value,
      statusId: this.form.get('statusIndex')?.value,
      createdDate: this.plan?.createdDate ? this.plan?.createdDate : new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())),
      userId: +(localStorage.getItem('user_id'))!
    }

    this.modalClosedWithEdit.emit(entity);
  }

  
}
