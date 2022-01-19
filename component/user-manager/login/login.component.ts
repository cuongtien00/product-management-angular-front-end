import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {SignInForm} from "../../../model/SignInForm";
import {Subscription} from "rxjs";
import {AuthService} from "../../../service/auth.service";
import {TokenService} from "../../../service/token.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {

 form: any = {}
  hide = true;
  // @ts-ignore
  signInForm: SignInForm = {}
  // @ts-ignore
  status = "Please fill in the form to login!";
  subscription: Subscription|undefined;
  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
  }

  login() {
    // @ts-ignore
    this.signInForm = new SignInForm(
      this.form.username,
      this.form.password
  )
    // @ts-ignore
    this.subscription  = this.authService.signIn(this.signInForm).subscribe(data => {
      if (data.token != undefined) {
          this.tokenService.setToken(data.token);
          this.tokenService.setName(data.name);
          this.tokenService.setRole(data.roles);
          this.tokenService.setAvatar(data.avatar)
          this.tokenService.setUserId(data.id)
          console.log('jwtResponse: ' +JSON.stringify(data))
          // Chuyen trang sau do reload
          this.router.navigate(["/user-account"]).then(()=>{
            window.location.reload();
          });
      }
      else {
        alert(data.message);

      }

     // }
    },error => {
      this.authService.handleError(error);
      alert(error);
      console.log(JSON.parse(error));
    })


  }

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }


}
