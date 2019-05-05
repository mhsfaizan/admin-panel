import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private _http:HttpClient) { }
  addNew(data){
    let fd = new FormData();
    for(let i in data){
      fd.append(i,data[i]);
    }
    return this._http.post("/adminpanel/php/add-new.php",fd)
  }
  getBlogs(){
    return this._http.get("/adminpanel/php/get-blog.php");
  }
  getBlog(data){
    let fd = new FormData();
    fd.append("id",data.id);
    return this._http.post("/adminpanel/php/get-one-blog.php",fd);
  }
  getComments(){
    return this._http.get("/adminpanel/php/get-comments.php");
  }
  isApprove(data){
    let fd = new FormData();
    for(let key in data){
      fd.append(key,data[key]);
    }
    return this._http.post("/adminpanel/php/approve.php",fd)
  }
  delete(data){
    let fd = new FormData();
    for(let key in data){
      fd.append(key,data[key]);
    }
    return this._http.post("/adminpanel/php/delete.php",fd)
  }
  deleteBlog(blogId){
    let fd = new FormData();
    fd.append('blogid',blogId)
    return this._http.post("/adminpanel/php/delete-blog.php",fd);;
  }
  updateBlog(data){
    let fd = new FormData();
    for(let i in data){
      fd.append(i,data[i]);
    }
    return this._http.post("/adminpanel/php/update-blog.php",fd);
  }
}
