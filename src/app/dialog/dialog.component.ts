import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LibroService } from '../services/libro.service';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit{

  bookForm ! : FormGroup
  actionBtn: string = "save"
  constructor(
    private formBuilder: FormBuilder,
    private api: LibroService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef : MatDialogRef<DialogComponent>
    ){ }

  ngOnInit(): void {
    this.bookForm = this.formBuilder.group({
      bookName: ['',Validators.required],
      category: ['',Validators.required],
      file: ['',Validators.required],
      image: ['',Validators.required],
      editorial: ['',Validators.required],
      description: ['',Validators.required]
    });

    if(this.editData){
      this.actionBtn = "update";
      this.bookForm.controls['bookName'].setValue(this.editData.bookName);
      this.bookForm.controls['category'].setValue(this.editData.category);
      this.bookForm.controls['file'].setValue(this.editData.file);
      this.bookForm.controls['image'].setValue(this.editData.image);
      this.bookForm.controls['editorial'].setValue(this.editData.editorial);
      this.bookForm.controls['description'].setValue(this.editData.description);
    }
  }
  addLibro(){
    if(!this.editData){
      if(this.bookForm.valid){
        this.api.postBook(this.bookForm.value).subscribe({
          next: (res)=>{
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Libro Agregado!',
              showConfirmButton: false,
              timer: 1500
            })
            this.bookForm.reset()
            this.dialogRef.close('save')
          },
          error : ()=>{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Algo Salio Mal!',
            })
          }
        })
      }
    }else{
      this.updateBook()
    }
  }
  updateBook(){
    this.api.putBook(this.bookForm.value, this.editData.id)
    .subscribe({
      next:(res)=>{
        Swal.fire('Libro Actualizado!')
        this.bookForm.reset();
        this.dialogRef.close('update')
      },
      error:()=>{
        Swal.fire('Algo Salio Mal!')
      }
    })
  }
}
