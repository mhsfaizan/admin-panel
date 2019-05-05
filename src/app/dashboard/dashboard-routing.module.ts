import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BlogsComponent } from './blogs/blogs.component';
import { AddNewComponent } from './add-new/add-new.component';
import { CommentComponent } from './comment/comment.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {
    path:"",
    component:HomeComponent,
    children:[
      {
        path:'',
        component:DashboardComponent
      },
      {
        path:'blogs',
        component:BlogsComponent
      },
      {
        path:'blog/:id',
        component:BlogComponent
      },
      {
        path:"add-new",
        component:AddNewComponent
      },
      {
        path:'comment',
        component:CommentComponent
      },
      {
        path:'edit/:blog_id',
        component:EditComponent
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
