import { Component, Input, OnInit } from '@angular/core';
import { EstudiantesService } from '../../services/estudiantes.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-registro-estudiante',
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
  templateUrl: './registro-estudiante.component.html',
  styleUrl: './registro-estudiante.component.scss'
})
export class RegistroEstudianteComponent implements OnInit {


  @Input() rol: string = "";
  @Input() datos_user: any = {};

  public estudiante: any = {};
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
    private estudiantesServices: EstudiantesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

    // Obtener el ID desde la URL
    this.idUser = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    if (this.idUser) {
      // modo edición
      this.editar = true;

      // Obtener los datos del estudiante por ID
      this.estudiantesServices.getEstudianteByID(this.idUser).subscribe({
        next: (data) => {
          this.estudiante = data;
          console.log("Datos cargados para edición:", this.estudiante);
        },
        error: (err) => {
          console.error('Error al obtener estudiante:', err);
          alert('No se pudieron cargar los datos del estudiante');
        }
      });

    } else {
      // Modo registro
      this.estudiante = this.estudiantesServices.esquemaEstudiante();
      this.estudiante.rol = this.rol;
      console.log("Datos estudiante (nuevo): ", this.estudiante);
    }
  }


  //VALIDACIÓN en tiempo real (incluye el checkbox)
  validate() {
    this.errors = this.estudiantesServices.validarEstudiante(
      this.estudiante,
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
    //Validación del formulario
    this.errors = [];

    this.errors = this.estudiantesServices.validarEstudiante(this.estudiante, this.editar);
    if (!$.isEmptyObject(this.errors)) {
      return;   // detener ejecución sin retornar un boolean
    }
    //validar contraseña
    if (this.estudiante.password == this.estudiante.confirm_password) {
      //Aquí se va a ejecutar la lógica de programación para registrar un usuario
      this.estudiantesServices.registrarEstudiantes(this.estudiante).subscribe(
        (response) => {
          //Aquí va la ejecución del servicio si todo es correcto
          alert("Usuario registrado correctamente");
          console.log("Usuario registrado: ", response);
          if (this.token != "") {
            this.router.navigate(["home"]);
          } else {
            this.router.navigate(["/"]);
          }
        }, (error) => {
          //Aquí se ejecuta el error
          alert("No se pudo registrar usuario");
        }
      );


    } else {
      alert("Las contraseñas no coinciden");
      this.estudiante.password = "";
      this.estudiante.confirm_password = "";
    }
  }

  public actualizar(): void {

    // Validar campos
    this.errors = this.estudiantesServices.validarEstudiante(this.estudiante, this.editar);
    if (Object.keys(this.errors).length > 0) return;

    // Enviar al backend
    this.estudiantesServices.editarEstudiante(this.estudiante).subscribe({
      next: () => {
        alert('Estudiante actualizado correctamente');
        this.router.navigate(['/usuarios']);  // Redirigir
      },
      error: (err) => {
        console.error('Error al actualizar el estudiante:', err);
        alert('No se pudo actualizar el estudiante');
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
