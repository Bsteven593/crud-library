import { FormBuilder,FormGroup,Validators} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { datamodel } from '../model';
import { ApiService } from '../api.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  employeeform!:FormGroup;
  data:undefined|datamodel[];

  constructor(private formbuilder:FormBuilder,private api:ApiService){ }

  ngOnInit(): void {
    this.employeeform=this.formbuilder.group({
      alias:['',Validators.required],
      comentarios:['',Validators.required],
    })
    this.getemployee();;
  }

  addemployee(data: datamodel){
    console.log(data)

    this.api.addemployee(data).subscribe((res=>{
      this.employeeform.reset();
    }))
    this.employeeform.reset();
  }
    getemployee(){
      this.api.getemployee().subscribe(res=>{
        this.data= res;
      })
    }



}
