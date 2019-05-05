import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

  constructor(private _blog:BlogService,private _matsnack:MatSnackBar) { }
  isShow = true;
  blogs:any;
  ngOnInit() {
    this.getBlogs().subscribe((resp:any)=>{
      this.isShow = false;
      this.blogs = resp.data;
      this._matsnack.open(resp.message,"ok",{
        duration:2000
      })
    },()=>{      
      this.isShow = false;
      this._matsnack.open("Server Error.","ok",{
        duration:2000
      })
    });
  }
  getBlogs(){
    return this._blog.getBlogs();
  }
}
