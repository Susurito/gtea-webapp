import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AdministradoresService } from '../../services/administradores.service';
import { AuthService } from '../../services/auth.service';

declare var $: any;

// Angular Material
// Angular Material (MDC moderno para Angular 19)
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro-admin',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule
  ],
  templateUrl: './registro-admin.component.html',
  styleUrl: './registro-admin.component.scss'
})
export class RegistroAdminComponent implements OnInit {

  @Input() rol: string = "";
  @Input() datos_user: any = {};

  public admin: any = {};
  public errors: any = {};
  public editar: boolean = false;
  public token: string = "";
  public idUser: Number = 0;

  //Para contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';

  constructor(
    private location: Location,
    public activatedRoute: ActivatedRoute,
    private administradoresService: AdministradoresService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.admin = this.administradoresService.esquemaAdmin();
    //rol del susuario
    this.admin.rol = this.rol;

    console.log("Datos admin: ", this.admin);
  }

  //VALIDACIÓN en tiempo real (incluye el checkbox)
  validate() {
    this.errors = this.administradoresService.validarAdmin(
      this.admin,
      this.editar
    );
  }

  //Funciones para password
  showPassword() {
    if (this.inputType_1 == 'password') {
      this.inputType_1 = 'text';
      this.hide_1 = true;
    }
    else {
      this.inputType_1 = 'password';
      this.hide_1 = false;
    }
  }

  showPwdConfirmar() {
    if (this.inputType_2 == 'password') {
      this.inputType_2 = 'text';
      this.hide_2 = true;
    }
    else {
      this.inputType_2 = 'password';
      this.hide_2 = false;
    }
  }

  public regresar() {
    this.location.back();
  }

  public registrar(): void {
    this.errors = {};
    this.errors = this.administradoresService.validarAdmin(this.admin, this.editar);
    if (Object.keys(this.errors).length > 0) {
      return;
    }
    console.log("paso la validacion");
  }

  public actualizar() {

  }

  public soloLetras(event: KeyboardEvent) {
    const charCode = event.key.charCodeAt(0);
    // Permitir solo letras (mayúsculas y minúsculas) y espacio
    if (
      !(charCode >= 65 && charCode <= 90) &&  // Letras mayúsculas
      !(charCode >= 97 && charCode <= 122) && // Letras minúsculas
      charCode !== 32                         // Espacio
    ) {
      event.preventDefault();
    }
  }
}
