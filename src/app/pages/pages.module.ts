import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { InicioComponent } from './inicio/inicio.component';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [
    PagesComponent,
    UsuarioComponent,
    InicioComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
