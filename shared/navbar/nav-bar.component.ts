import {Component, NgModule, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {Router, RouterModule} from '@angular/router';
// import {ThemePickerModule} from '../theme-picker';
import {ThemeStorage} from '../theme-picker/theme-storage/theme-storage';
import {StyleManager} from '../style-manager';
import {HttpClientModule} from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import {TokenService} from '../../service/token.service';
import {AppModule} from "../../app.module";
import {ThemePickerModule} from "../theme-picker/theme-picker.component";

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit{
  name: any;
  isCheckLogin = false;
  avatar: any;
  constructor(
    private tokenService: TokenService,
    private router: Router) {
  }
  ngOnInit(): void {
    // @ts-ignore
    if(this.tokenService.getToken()){
      this.isCheckLogin = true;
      // @ts-ignore
      this.name = this.tokenService.getName();
      console.log(this.tokenService.getName())
      // @ts-ignore
      this.avatar = this.tokenService.getAvatar();
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

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
    ThemePickerModule,
    MatIconModule,
    ThemePickerModule,

  ],
  exports: [NavBarComponent],
  declarations: [NavBarComponent],
  providers: [StyleManager, ThemeStorage]
})
export class NavBarModule {}
