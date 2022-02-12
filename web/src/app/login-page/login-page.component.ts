import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { AccountService } from '../services/account.service';
import { InformService } from '../services/inform.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private accountService: AccountService,
              private infoService: InformService) { }

  isVisible: boolean = false;
  loginForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl('')
  });

  error: string = "";

  ngOnInit(): void {
    this.infoService.getInfo().subscribe(res => {
      this.error = res;
    })
  }

  login(){
    this.accountService.login(this.loginForm.value).subscribe(res => {
      if(res.access_token){
        this.accountService.setToken(res.access_token);
        this.accountService.setUser(res.user_id);
        window.location.href = "./planning-page";
      }
    })
    this.error = "";
  }

  openModal(){
    this.isVisible = true;
  }

  closeModal(){
    this.isVisible = false;
  }

}
