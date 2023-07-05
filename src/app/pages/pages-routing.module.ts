import { LoginComponent } from './../auth/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { BibliotecarioComponent } from './bibliotecario/bibliotecario.component';
import { UsuarioComponent } from './usuario/usuario.component';

const routes:Routes=[
  { path: 'login', component: LoginComponent , children:[

  ]},
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class PagesRoutingModule { }
