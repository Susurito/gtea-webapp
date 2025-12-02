import { Component, Input, OnInit } from '@angular/core';
import { NavbarComponent } from "../../../partials/navbar/navbar.component";
import { FooterComponent } from "../../../partials/footer/footer.component";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../../services/auth.service';

declare var $: any;

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-screen',
  imports: [
    NavbarComponent,
    FooterComponent,
    RouterLink,
    CommonModule,
    FormsModule
  ],
  templateUrl: './login-screen.component.html',
  styleUrl: './login-screen.component.scss'
})
export class LoginScreenComponent implements OnInit {

  public username: string = "";
  public password: string = "";
  public type: string = "password";
  public errors: any = {};
  public load: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
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

  public login(): void {
    // Validar
    this.errors = [];

    this.errors = this.authService.validarLogin(this.username, this.password);

    if (!$.isEmptyObject(this.errors)) {
      return; // ✔️ no devuelve ningún valor
    }

    // Llamada al servicio
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        this.authService.saveUserData(response);
        this.router.navigate(["dashboard"]);
      },
      (error) => {
        alert("No se pudo iniciar sesión");
      }
    );
  }


  public showPassword() {
    if (this.type == "password") {
      $("#show-password").addClass("show-password");
      $("#show-password").attr("data-password", true);
      this.type = "text";
    } else if (this.type == "text") {
      $("#show-password").removeClass("show-password");
      $("#show-password").attr("data-password", false);
      this.type = "password";
    }
  }

  public registrar() {
    this.router.navigate(["registro-usuarios"])
  }
}
