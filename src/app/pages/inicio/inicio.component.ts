import { Component } from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  constructor(private router: Router) {}
  irALogin() {
    this.router.navigate(['/login']); // Ruta del componente de login
  }

  irARegistro() {
    this.router.navigate(['/register']); // Ruta del componente de registro
  }
}
