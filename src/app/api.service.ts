import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { datamodel } from './model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }


  addemployee(data:datamodel){
    return this.http.post<datamodel>("http://localhost:3000/posts",data)
  }

  getemployee(){
    return this.http.get<datamodel[]>("http://localhost:3000/posts");
  }
}


