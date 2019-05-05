import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { BlogComponent } from './blog/blog.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatMenuModule } from '@angular/material';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BlogsComponent } from './blogs/blogs.component';
import { AddNewComponent } from './add-new/add-new.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { CommentComponent } from './comment/comment.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { EditComponent } from './edit/edit.component';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  declarations: [HomeComponent, BlogComponent,BlogsComponent, NavbarComponent, DashboardComponent, AddNewComponent, CommentComponent, EditComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatCheckboxModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatIconModule,
    MatTableModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CKEditorModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatProgressBarModule
  ]
})
export class DashboardModule { }
