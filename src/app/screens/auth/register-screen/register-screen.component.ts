import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../../../partials/footer/footer.component";
import { NavbarComponent } from "../../../partials/navbar/navbar.component";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from '../../../services/auth.service';
import { Location } from '@angular/common';

// Angular Material
import { MatRadioModule, MatRadioChange } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegistroAdminComponent } from "../../../partials/registro-admin/registro-admin.component";
import { RegistroEstudianteComponent } from "../../../partials/registro-estudiante/registro-estudiante.component";
import { RegistroOrganizadorComponent } from "../../../partials/registro-organizador/registro-organizador.component";

@Component({
  selector: 'app-register-screen',
  standalone: true,  // 🔹 imprescindible
  imports: [
    FooterComponent,
    NavbarComponent,
    MatRadioModule,
    MatButtonModule,
    FormsModule,
    CommonModule,
    RegistroAdminComponent,
    RegistroEstudianteComponent,
    RegistroOrganizadorComponent
],
  templateUrl: './register-screen.component.html',
  styleUrls: ['./register-screen.component.scss']
})
export class RegisterScreenComponent implements OnInit {

  public tipo: string = "registro-usuarios";
  public user: any = {};
  public editar: boolean = false;
  public rol: string = "";
  public idUser: number = 0;

  // Banderas para el tipo de usuario
  public isAdmin: boolean = false;
  public isOrganizador: boolean = false;
  public isEstudiante: boolean = false;

  public tipo_user: string = "";

  constructor(
    private location : Location,
    public activatedRoute: ActivatedRoute,
    private router: Router,
    public authService: AuthService,
  ) { }

  ngOnInit(): void { }

  //  Método para capturar el cambio de radio button
  public radioChange(event: MatRadioChange) {
    if(event.value === "administrador"){
      this.isAdmin = true;
      this.isOrganizador = false;
      this.isEstudiante = false;
      this.tipo_user = "administrador";
    } else if (event.value === "organizador"){
      this.isAdmin = false;
      this.isOrganizador = true;
      this.isEstudiante = false;
      this.tipo_user = "organizador";
    } else if (event.value === "estudiante"){
      this.isAdmin = false;
      this.isOrganizador = false;
      this.isEstudiante = true;
      this.tipo_user = "estudiante";
    }
  }
}
