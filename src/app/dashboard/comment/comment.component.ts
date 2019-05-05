import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSnackBar} from '@angular/material';
import { BlogService } from 'src/app/services/blog.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  displayedColumns: string[] = [ '#','Comment','name','email', 'UpdateOn', 'status','Blog','Action'];
  dataSource:any;
  isData = false;
  constructor(private _blog:BlogService,private _router:Router,private _matsnack:MatSnackBar) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this._blog.getComments().subscribe((resp:any)=>{
      if(resp.data){
        this.isData = true;
      }
      this.dataSource = new MatTableDataSource<any>(resp.data);
      this.dataSource.paginator = this.paginator;
    },(err)=>{
      console.log(err);
    });
    
  }
  isApprove(isApprove,commentId){
    this._blog.isApprove({isApprove,commentId}).subscribe((resp:any)=>{
      this._matsnack.open(resp.message,"ok",{
        duration:2000
      })
      if(resp.status){
        setTimeout(()=>{
          this._router.navigate(["/dashboard"]);
        },2500 )
      }
    },(err)=>{
      this._matsnack.open("Server Error.","ok",{
        duration:2000
      })
    });
    // if(isApprove == 0){
    //   console.log("approve krna hai");
    // }else{
    //   console.log("unapprove krna hai");
    // }
  }
  delete(commentId){
    let isDel = confirm("Confirm to delete.");
    if(isDel){
      this._blog.delete({commentId}).subscribe((resp:any)=>{
        this._matsnack.open(resp.message,"ok",{
          duration:2000
        })
        if(resp.status){
          setTimeout(()=>{
            this._router.navigate(['/dashboard']);
          },2500);
        }
      },(err)=>{
        this._matsnack.open("Server Error.",'ok',{
          duration:2000
        })
      });
    }else{
      console.log("delete ni krna hai");
    }
  }

}

