import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm:FormGroup;
  constructor(private _auth:AuthServiceService,private _snakbar:MatSnackBar,private _router:Router) { }
  isShowProgress = false;
  ngOnInit() {
    this.loginForm = new FormGroup({
      email:new FormControl(''),
      password:new FormControl('')
    })
  }
  onSubmit(){
    this.isShowProgress = true;
    this._auth.login(this.loginForm).subscribe((data:any)=>{
      console.log(data);
      this.isShowProgress = false;
      if(data.status){
        console.log(data.message);
        localStorage.setItem("login","true");
        this._snakbar.open(data.message,"ok",{
          duration:2000
        });
        setTimeout(()=>{
          this._router.navigate(['/dashboard']);
        },2500);
      }else{
        this._snakbar.open(data.message,"ok",{
          duration:2000
        });
        console.log(data.message);
      }
    },(err)=>{
      this._snakbar.open("Server Error","ok",{
        duration:2000
      });
      this.isShowProgress = false;
      console.log("error found");
    });
  }
}
