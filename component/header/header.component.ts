import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {TokenService} from "../../service/token.service";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
name:string = '';
checkLogin = false;
  constructor(
    private router:Router,
    private tokenService: TokenService

  ) {}

  ngOnInit(): void {

if (this.tokenService.getToken()){
  this.name = this.tokenService.getName();
  this.checkLogin = true;
}
  }


  logout() {
    this.tokenService.logout();
    //Chuyen trang sau do reload
    this.router.navigate(['/login']).then(()=>{
      window.location.reload();
    })
  }

}
