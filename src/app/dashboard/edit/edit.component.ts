import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  editForm: FormGroup;
  editorData:any;
  image:any;
  uploaded = false;
  blog_id:number;
  isChecked = true;
  constructor(private _snakcbar:MatSnackBar,private _security:DomSanitizer,private _activated: ActivatedRoute, private _blog: BlogService,private _router:Router) { }
  public Editor = DecoupledEditor;
  isData = false;
  ngOnInit() {
    this._activated.params.subscribe((resp: any) => {
      this._blog.getBlog({ id: resp.blog_id }).subscribe((resp: any) => {
        if (resp.data.blog) {
          this.blog_id = resp.data.blog.blog_id;
          this.isData = true;
          this.editForm = new FormGroup({
            title: new FormControl(resp.data.blog.title, Validators.required),
            keywords: new FormControl(resp.data.blog.keywords, Validators.required),
            description: new FormControl(resp.data.blog.short_desc, Validators.required),
          });
          this.editorData = resp.data.blog.desc;
        }
      }, (err) => {
        console.log("error");
      });
    });


  }
  config = {
    // placeholder: 'Type the content here!',
    heading: {
      options: [
        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
        { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
        { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
        { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
        { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' },
      ]
    },
    ckfinder: {
      uploadUrl: 'https://cksource.com/weuy2g4ryt278ywiue/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json'
    },
    toolbar: ['heading', '|', 'bold', 'italic', 'imageUpload', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'alignment:justify', 'alignment:center', 'alignment:left', 'alignment:right', 'highlight'],
  }
  public onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }
  addImage(files) {
    if (files[0]) {
      let image = {
        image: files[0],
        data: this._security.bypassSecurityTrustUrl(URL.createObjectURL(files[0]))
      }
      this.image = image;
    }
  }
  onChange({ editor }: ChangeEvent) {
    if (editor) {
      this.editorData = editor.getData();
    }
  }
  onSubmit() {
    this.uploaded = true;
    if (!this.editorData) {
      this.uploaded = false;
      this._snakcbar.open("Please fill All entries", "Ok", {
        duration: 2000
      })
    } else {
      let obj;
      if(this.isChecked){
        obj = { blog_id:this.blog_id, data: this.editorData, editForm: JSON.stringify(this.editForm.value) }
      }else{
        obj = { blog_id:this.blog_id, image: this.image.image,data: this.editorData, editForm: JSON.stringify(this.editForm.value) }
      }
      this._blog.updateBlog(obj).subscribe((resp: any) => {
        console.log(resp);
        this.uploaded = false;
        this._snakcbar.open(resp.message, "Ok", {
          duration: 2000
        });
        setTimeout(() => {
          this._router.navigate(["/dashboard/blogs"]);
        }, 2500)
      }, (err) => {
        this.uploaded = false;
        this._snakcbar.open("Server Error.", "Ok", {
          duration: 2000
        })
      })
    }
  }
}
