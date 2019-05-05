import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { BlogService } from 'src/app/services/blog.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css']
})
export class AddNewComponent implements OnInit {

  constructor(private _security: DomSanitizer, private _router: Router, private _blog: BlogService, private _snakcbar: MatSnackBar) { }
  public Editor = DecoupledEditor;
  blogForm: FormGroup;
  image: any;
  data: any;
  uploaded = false;
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
    toolbar: ['heading', '|', 'bold', 'italic', 'imageUpload', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'alignment:justify','alignment:center','alignment:left','alignment:right','highlight'],
  }
  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );
  }
  ngOnInit() {
    
    this.blogForm = new FormGroup({
      title: new FormControl('', Validators.required),
      keywords: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
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
      this.data = editor.getData();
    }
  }
  onSubmit() {
    this.uploaded = true;
    if (!this.image || !this.data) {
      this.uploaded = false;
      this._snakcbar.open("Please fill All entries", "Ok", {
        duration: 2000
      })
    } else {
      this._blog.addNew({ image: this.image.image, data: this.data, blogForm: JSON.stringify(this.blogForm.value) }).subscribe((resp: any) => {
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
