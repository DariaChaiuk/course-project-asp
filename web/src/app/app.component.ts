import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'web';
  isAuthorized = false;
  constructor(private accountService: AccountService, private router: Router) {}
  
  ngOnInit(): void {
    if(!localStorage.getItem("access_token")){
      this.router.navigate(['./login-page'])
    }
    this.accountService.getTokenNotification().subscribe(token => {
      this.isAuthorized = token ? true : false;
    })
  }

  logout(){
    this.accountService.logout();
    window.location.href = "./login-page";
  }
}
