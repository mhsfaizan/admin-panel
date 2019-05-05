import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private _http:HttpClient) { }
  login(data:FormGroup){
      return this._http.post("/adminpanel/php/login.php",data.value);
  }
  isLoggedIn(){
    if(localStorage.getItem("login")){
      return true;
    }else{
      return false;
    }
  }
}
