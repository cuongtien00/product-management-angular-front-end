import { Component, OnInit } from '@angular/core';
import {TokenService} from "../../../service/token.service";
import {ChangeAvatar} from "../../../model/ChangeAvatar";
import {AuthService} from "../../../service/auth.service";

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  constructor(
    private tokenService: TokenService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  // @ts-ignore
  onChangeAvatar(event) {
    this.tokenService.setAvatar(event);
    let changeAvatar: ChangeAvatar = new ChangeAvatar(event);
    console.log('changeAvatar:' + JSON.stringify(changeAvatar));
    this.authService.updateAvatar(changeAvatar).subscribe(data => {
      console.log('data: ' + JSON.stringify(data));
    });
    window.location.reload();
  }
}
