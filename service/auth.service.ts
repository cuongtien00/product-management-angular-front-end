import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";
import {SignUpForm} from "../model/SignUpForm";
import {Observable} from "rxjs";
import {ChangeAvatar} from "../model/ChangeAvatar";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_SIGNUP = environment.API_LOCAL+'signup';
  private API_LOGIN = environment.API_LOCAL+'login';
  private API_CHANGE_AVATAR = environment.API_LOCAL+'change-avatar';

  constructor(private http: HttpClient) { }

  signUp(signUpForm: SignUpForm): Observable<any>{
    return this.http.post(this.API_SIGNUP,signUpForm);
  }
  signIn (signInForm: SignUpForm):Observable<any>{
    return this.http.post(this.API_LOGIN, signInForm);
  }
  // @ts-ignore
  updateAvatar(changeAvatar: ChangeAvatar):Observable<any>{
    return this.http.put(this.API_CHANGE_AVATAR,changeAvatar);
  }
  handleError(err: any){
    if (err.error instanceof Error) {
      console.log(`Client-side error: ${err.error.message}`);
    } else {
      console.log(`Server-side error: ${err.status} - ${err.error.value}`);
    }
  }
}
