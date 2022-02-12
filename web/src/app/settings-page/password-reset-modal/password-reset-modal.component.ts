import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InformService } from 'src/app/services/inform.service';

@Component({
  selector: 'app-password-reset-modal',
  templateUrl: './password-reset-modal.component.html',
  styleUrls: ['./password-reset-modal.component.css']
})
export class PasswordResetModalComponent implements OnInit {

  constructor() { }
  form: FormGroup = new FormGroup({
    currentPassword: new FormControl(),
    newPassword: new FormControl()
  });

  @Input() isVisible : boolean = false ;
  @Output() modalClosed = new EventEmitter<void>();
  @Output() modalClosedWithEdit = new EventEmitter<any>();

  ngOnInit(): void {
  }

  close(){
    this.modalClosed.emit();
  }

  closeWithEdit(){
    this.modalClosedWithEdit.emit(this.form.value);
  }
}
