import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Status } from 'src/app/models/status.interface';

@Component({
  selector: 'app-modal-status-edit',
  templateUrl: './modal-status-edit.component.html',
  styleUrls: ['./modal-status-edit.component.css']
})
export class ModalStatusEditComponent implements OnInit {

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.status = {
      id: this.status?.id ? this.status.id : 0,
      statusName: this.status?.statusName ? this.status?.statusName : '',
      userId: +(localStorage.getItem('user_id'))!
    }

    this.form.controls["statusName"].setValue(this.status?.statusName);
  }

  form: FormGroup = new FormGroup({
    statusName: new FormControl(''),
  });
  @Input() status: Status | undefined;
  @Input() isVisible : boolean = false ;
  @Output() modalClosed = new EventEmitter<void>();
  @Output() modalClosedWithEdit = new EventEmitter<Status>();
  
  ngOnInit() {}
  
  close(){
    this.status = undefined;
    this.modalClosed.emit();
  }

  closeWithEdit(){

    let entity: Status = {
      id: this.status?.id ? this.status.id : 0,
      statusName: this.form.get('statusName')?.value,
      userId: +(localStorage.getItem('user_id'))!
    }

    this.modalClosedWithEdit.emit(entity);
  }

  

}
