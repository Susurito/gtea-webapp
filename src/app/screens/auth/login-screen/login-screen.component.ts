import { Component, Input, OnInit } from '@angular/core';
import { NavbarComponent } from "../../../partials/navbar/navbar.component";
import { FooterComponent } from "../../../partials/footer/footer.component";
import { RouterLink } from "@angular/router";
import { Router } from '@angular/router';
import { FacadeService } from '../../../services/facade.service';

@Component({
  selector: 'app-login-screen',
  imports: [NavbarComponent, FooterComponent, RouterLink],
  templateUrl: './login-screen.component.html',
  styleUrl: './login-screen.component.scss'
})
export class LoginScreenComponent implements OnInit {

  @Input() rol: string = "";

  // Enumeración simple de roles usados en plantillas
  ROLES = {
    ADMINISTRADOR: 'administrador',
    ORGANIZADOR: 'organizador',
    ESTUDIANTE: 'estudiante'
  } as const;

  userRole: string = '';

  constructor(
    private router: Router,
    private facadeService: FacadeService,
    ) { }

  ngOnInit(): void {
    // Leer rol desde el facade (lee la cookie o estado)
    this.rol = this.facadeService.getUserGroup() || '';
    this.userRole = this.rol;
    console.log('Rol user: ', this.rol);
  }

  public goAdmin(): void {
    this.router.navigate(['/admin']);
  }

  // Método para pruebas: cambiar rol en tiempo de ejecución
  setRole(role: string) {
    this.facadeService.setUserGroup(role);
    this.rol = role;
    this.userRole = role;
    console.log('Rol seteado a:', role);
  }

  hasRole(role: string): boolean {
    return this.rol === role;
  }

}
