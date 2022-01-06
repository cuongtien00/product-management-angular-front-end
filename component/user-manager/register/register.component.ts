import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../../service/auth.service";
import {Subscription} from "rxjs";
import {FormControl, Validators} from "@angular/forms";
import {SignUpForm} from "../../../model/SignUpForm";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit,OnDestroy {
  status = 'Please fill in the form to register!';
  hide = true;
  form: any ={
  };
  // emailFormControl = new FormControl("",[Validators.email,Validators.required]);
  subscription: Subscription|undefined;
  // @ts-ignore
  signUpForm: SignUpForm ;

  error1 : any = {
    message: "user has exists!"
  }

  error2 : any = {
    message: "email has exists!"
  }
  success : any = {
    message: "Success!"
  }


  constructor(
    private authService :AuthService
  ) { }

  ngOnInit(): void {
  }

  ngSubmit() {
// @ts-ignore
    this.signUpForm = new SignUpForm(
  this.form.name,
  this.form.username,
  this.form.email,
  this.form.password
)
console.log(this.signUpForm);

    // console.log(this.form);
    this.subscription = this.authService.signUp(this.signUpForm).subscribe(data => {
      if (JSON.stringify(data) == JSON.stringify(this.error1)){
        this.status = "The username is exists!";
      }
      if (JSON.stringify(data) == JSON.stringify(this.error2)){
        this.status = "The email is exists!";
      }
      if (JSON.stringify(data) == JSON.stringify(this.success)){
        alert("Register is Success!");
      }
      console.log(`data: ` +JSON.stringify(data.message));
    },error => {
      this.authService.handleError(error);
    })

  }

  ngOnDestroy(): void {
    if (this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
