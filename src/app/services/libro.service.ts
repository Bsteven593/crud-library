import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  constructor(private http: HttpClient){}

  postBook(data: any){
    return this.http.post<any>("http://localhost:3000/book/", data)
  }
  getBook(){
    return this.http.get<any>("http://localhost:3000/book/")
  }
  putBook(data: any, id : number){
    return this.http.put<any>("http://localhost:3000/book/"+id,data)
  }
  deleteBook(id : number){
    return this.http.delete<any>("http://localhost:3000/book/"+id)
  }
}
