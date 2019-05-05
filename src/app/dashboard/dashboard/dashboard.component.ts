import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private _blog: BlogService) { }
  blogs: number;
  comments: number;
  ngOnInit() {
    this._blog.getBlogs().subscribe((resp: any) => {
      this._blog.getComments().subscribe((nextresp: any) => {
        if(resp.data){
          this.blogs = resp.data.length;
        }
        if(nextresp.data){
          this.comments = nextresp.data.length;
        }
      })
    })
  }
}
