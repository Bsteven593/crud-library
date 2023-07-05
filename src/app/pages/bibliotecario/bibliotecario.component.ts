import { Dialog } from '@angular/cdk/dialog';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogModule, MatDialogConfig} from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { LibroService } from 'src/app/services/libro.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bibliotecario',
  templateUrl: './bibliotecario.component.html',
  styleUrls: ['./bibliotecario.component.css']
})
export class BibliotecarioComponent implements OnInit{

  displayedColumns: string[] = ['bookName', 'category', 'file', 'image', 'editorial', 'description', 'action'];
  dataSource ! : MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    private _dialog: MatDialog,
    private api : LibroService
    ){}

    ngOnInit(): void {
        this.getAllBooks();
    }
  openDialog(){
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.width = '70%'
    // this._dialog.open(DialogComponent)
    this._dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getAllBooks()
      }
    })
  }
  getAllBooks(){
    this.api.getBook().subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{
      alert("Un Error Aparecio")
      }
    })
  }
  editBook(row: any){
    this._dialog.open(DialogComponent,{
      width: '30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val === 'update'){
        this.getAllBooks();
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteBook(id:number){
    this.api.deleteBook(id)
    .subscribe({
      next:(res)=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Libro Eliminado!',
          showConfirmButton: false,
          timer: 1500
        })
        this.getAllBooks();
      },
      error:()=>{
        alert("Error mientras se elimina")
      }
    })
  }
}
