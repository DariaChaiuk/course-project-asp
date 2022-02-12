import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { AccountService } from '../services/account.service';
import { InformService } from '../services/inform.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {

  constructor(private accountService: AccountService,
              private infoService: InformService) { }

  registerForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  error: string[] = [];

  ngOnInit(): void {

    this.infoService.getInfo().subscribe(res => {
      this.error.push(res);
    })
  }

  registration(){
    this.error = [];
    this.accountService.registration({
      id: 0,
      name: this.registerForm.get("name")?.value,
      login: this.registerForm.get("email")?.value,
      password: this.registerForm.get("password")?.value,
      iconUrl: "https://martprod.com/assets/user_default-a212371bf066f6adfc2716b0f5630de67b814236d58c20f2eb0565beca93425d.png",
      plans: null
    }).subscribe(res => {
      if(res.access_token){
        this.accountService.setToken(res.access_token);
        this.accountService.setUser(res.user_id);
        window.location.href = "./planning-page";
      }
    });
    
  }
}
