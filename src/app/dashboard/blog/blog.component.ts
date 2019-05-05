import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit { 
  constructor(private _activatedRoute:ActivatedRoute,private _router:Router,private _blog:BlogService,private _matsnack:MatSnackBar) { }
  blog:any;
  comments:any;
  ngOnInit() {
    this._activatedRoute.params.subscribe((resp)=>{
      this._blog.getBlog(resp).subscribe((resp:any)=>{
        console.log(resp);
        this.blog = resp.data.blog;
        this.comments = resp.data.comments;
      });
    },(err)=>{
      console.log(err);
    });
  }
  delete(blogId){
    let isDel = confirm("Confirm Delete.");
    if(isDel){  
      this._blog.deleteBlog(blogId).subscribe((resp:any)=>{
        console.log(resp);
        this._matsnack.open(resp.message,"ok",{
          duration:2000
        })
        if(resp.status){
          this._router.navigate(["/dashboard/blogs"]);
        }
      },(err)=>{
          console.log(err);
          this._matsnack.open("Server Error.","ok",{
            duration:2000
          });
      });
    }else{
      console.log("nhi krna elte")
    }
  }
}
