import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../models/user.intreface';
import { InformService } from '../services/inform.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css']
})
export class SettingsPageComponent implements OnInit {

  constructor(private userService: UserService,
              private infoService: InformService) { }

  currentUser: User | undefined;
  form: FormGroup = new FormGroup({
    username: new FormControl(),
    iconUrl: new FormControl(),
  });
  error: string = "";

  isVisible: boolean = false;

  ngOnInit(): void {
    this.refreshData();
    this.infoService.getInfo().subscribe(res => {
      this.error = res;
    })
  }

  refreshData(){
    this.userService.getById(+(localStorage.getItem('user_id')!))
        .subscribe(res => {
          this.currentUser = res;
          this.form.controls["username"].setValue(this.currentUser?.name);
          this.form.controls["iconUrl"].setValue(this.currentUser?.iconUrl);
        })
  }

  openModal(){
    this.isVisible = true;
  }

  closeModal(){
    this.isVisible = false;
  }

  closeModalAndEdit($event: any){
    this.userService.resetPassword(this.currentUser!.id, $event.currentPassword, $event.newPassword).subscribe(res => {
      console.log(res)
    });
    this.isVisible = false;
    this.error = "";
  }

  updateUser(){
    this.currentUser!.name = this.form.get('username')?.value;
    this.currentUser!.iconUrl = this.form.get('iconUrl')?.value;
    this.userService.update(this.currentUser).subscribe(res => {
      this.refreshData();
    })
  
  }

}
