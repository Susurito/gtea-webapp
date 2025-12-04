import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

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
import { VenuesService } from '../../services/venues.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-registro-sedes-aulas',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    NgxMaskDirective,
  ],
  templateUrl: './registro-sedes-aulas.component.html',
  styleUrl: './registro-sedes-aulas.component.scss'
})
export class RegistroSedesAulasComponent implements OnInit {
  @Input() datos_user: any = {};

  public tipo: string = "";
  public editar: boolean = false;
  public errors: any = {};
  public sede: any = {
    recursos_json: []
  };
  public idSede: number = 0;
  public esEstudiante: boolean = false;

  //Para el check
  public recurso: any[] = [
    { value: '1', nombre: 'Proyecto' },
    { value: '2', nombre: 'Pantalla' },
    { value: '3', nombre: 'Bocina' }

  ];

  constructor(
    private location: Location,
    public activatedRoute: ActivatedRoute,
    private venuesService: VenuesService,
    private authService: AuthService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.sede = this.venuesService.esquemaSede();
    console.log("Sede inicial: ", this.sede);

    const id = this.activatedRoute.snapshot.params['id'];
    if (id !== undefined) {
      this.editar = true;
      this.idSede = id;
      console.log("ID de la sede a editar: ", this.idSede);

      // Llamamos a backend para obtener los datos de la sede
      this.cargarSedePorId(this.idSede);
    }
  }

  // Nuevo método para obtener los datos de la sede por ID
  private cargarSedePorId(id: number) {
    this.venuesService.getEventoByID(id).subscribe({
      next: (data: any) => {
        console.log("Datos de la sede obtenidos: ", data);
        this.sede = {
          ...data,
          recursos_json: Array.isArray(data.recursos_json) ? data.recursos_json : []
        };
      },
      error: (err) => {
        console.error("Error al obtener la sede: ", err);
      }
    });
  }

  public registrar(): void {
    this.errors = this.venuesService.validarSede(this.sede, this.editar);
    if (!$.isEmptyObject(this.errors)) return;

    if (this.editar) {
      // Si estamos editando, usamos editarSede
      this.venuesService.editarSede(this.sede).subscribe({
        next: (response) => {
          alert("Sede actualizada correctamente");
          this.router.navigate(["sedes"]);
        },
        error: (err) => {
          console.error(err);
          alert("No se pudo actualizar la sede");
        }
      });
    } else {
      // Si es nuevo, usamos registrarSede
      this.venuesService.registrarSede(this.sede).subscribe({
        next: (response) => {
          alert("Sede registrada correctamente");
          this.router.navigate(["sedes"]);
        },
        error: (err) => {
          console.error(err);
          alert("No se pudo registrar la sede");
        }
      });
    }
  }


  public actualizar(): void {
    this.errors = this.venuesService.validarSede(this.sede, this.editar);
    if (!$.isEmptyObject(this.errors)) return;

    // Llamamos al servicio de edición
    this.venuesService.editarSede(this.sede).subscribe({
      next: (response) => {
        alert("Sede actualizada correctamente");
        console.log("Sede actualizada: ", response);
        this.router.navigate(["sedes"]);
      },
      error: (err) => {
        console.error("Error al actualizar la sede: ", err);
        alert("No se pudo actualizar la sede");
      }
    });
  }


  public regresar() {
    this.location.back();
  }


  public soloLetras(event: KeyboardEvent) {
    const charCode = event.key.charCodeAt(0);
    // Permitir solo letras (mayúsculas y minúsculas) y espacio
    if (
      !(charCode >= 65 && charCode <= 90) &&  // Letras mayúsculas
      !(charCode >= 97 && charCode <= 122) && // Letras minúsculas
      !(charCode >= 48 && charCode <= 57) &&  // Números
      charCode !== 32                         // Espacio
    ) {
      event.preventDefault();
    }
  }

  public signosBasicos(event: KeyboardEvent) {
    const char = event.key;

    // Expresión regular que permite:
    // Letras (a-z A-Z), números (0-9), espacio y signos de puntuación básicos
    const regex = /^[a-zA-Z0-9 .,;:!?¡¿'"()\-_/]*$/;

    if (!regex.test(char)) {
      event.preventDefault();
    }
  }


  public checkboxChange(event: any) {
    console.log("sede: ", event);

    // Garantizar que el array exista SIEMPRE
    if (!Array.isArray(this.sede.recursos_json)) {
      this.sede.recursos_json = [];
    }

    const valor = event.source.value;

    if (event.checked) {
      if (!this.sede.recursos_json.includes(valor)) {
        this.sede.recursos_json.push(valor);
      }
    } else {
      this.sede.recursos_json = this.sede.recursos_json.filter(
        (publico: string) => publico !== valor
      );
    }

    // Verificar si "Estudiantes" está seleccionado
    this.esEstudiante = this.sede.recursos_json.includes("Estudiantes");

    console.log("Array público: ", this.sede.recursos_json);
    console.log("¿Es estudiante?", this.esEstudiante);
  }



  public revisarSeleccion(nombre: string): boolean {
    if (this.sede.recursos_json) {
      const busqueda = this.sede.recursos_json.find((element: string) => element === nombre);
      return busqueda !== undefined;
    } else {
      return false;
    }
  }
}
