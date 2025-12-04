import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrganizadoresService } from '../../services/organizadores.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Location } from '@angular/common';

// Angular Material
// Angular Material (MDC moderno para Angular 19)
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';

declare var $: any;



@Component({
  selector: 'app-registro-organizador',
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
  templateUrl: './registro-organizador.component.html',
  styleUrl: './registro-organizador.component.scss'
})
export class RegistroOrganizadorComponent implements OnInit {

  @Input() rol: string = "";
  @Input() datos_user: any = {};

  public organizador: any = {};
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
    private route: ActivatedRoute,
    private location: Location,
    public activatedRoute: ActivatedRoute,
    private organizadoresServices: OrganizadoresService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.idUser = Number(this.route.snapshot.paramMap.get('id'));

    if (this.idUser) {
      this.editar = true;

      this.organizadoresServices.getAdminByID(this.idUser).subscribe({
        next: (data) => {
          this.organizador = data;
        },
        error: (err) => {
          console.error('Error al obtener organizador:', err);
          alert('No se pudieron cargar los datos del organizador');
        }
      });

    } else {
      this.organizador = this.organizadoresServices.esquemaOrganizador();
    }
  }




  //VALIDACIÓN en tiempo real (incluye el checkbox)
  validate() {
    this.errors = this.organizadoresServices.validarOrganizador(
      this.organizador,
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
    this.errors = this.organizadoresServices.validarOrganizador(this.organizador, this.editar);
    if (Object.keys(this.errors).length > 0) {
      return;
    }
    console.log("paso la validacion");
  }

  public actualizar(): void {
    this.errors = this.organizadoresServices.validarOrganizador(this.organizador, this.editar);
    if (Object.keys(this.errors).length > 0) return;

    this.organizadoresServices.editarOrganizador(this.organizador).subscribe({
      next: () => {
        alert('Usuario actualizado correctamente');
        this.router.navigate(['/usuarios']);
      },
      error: (err) => {
        console.error('Error al actualizar el usuario:', err);
        alert('No se pudo actualizar el usuario');
      }
    });
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
