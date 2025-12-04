import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';

declare var $: any;

@Component({
  selector: 'app-registro-categorias',
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
  templateUrl: './registro-categorias.component.html',
  styleUrl: './registro-categorias.component.scss'
})
export class RegistroCategoriasComponent implements OnInit {

  @Input() datos_user: any = {};

  public editar: boolean = false;
  public errors: any = {};
  public categoria: any = {};
  public idCategoria: number = 0;

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private categoriesService: CategoriesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Inicializamos con el esquema vacío
    this.categoria = this.categoriesService.esquemaCategoria();
    console.log("Categoría inicial: ", this.categoria);

    const id = this.activatedRoute.snapshot.params['id'];
    if (id !== undefined) {
      this.editar = true;
      this.idCategoria = id;
      console.log("ID de la categoría a editar: ", this.idCategoria);

      // Cargar datos de la categoría desde el backend
      this.cargarCategoriaPorId(this.idCategoria);
    }
  }

  // Método para cargar la categoría por ID
  private cargarCategoriaPorId(id: number): void {
    this.categoriesService.getCategoriaByID(id).subscribe({
      next: (data: any) => {
        console.log("Datos de la categoría obtenidos: ", data);
        this.categoria = { ...data, id: id }; // <--- agrega el id
      },
      error: (err) => {
        console.error("Error al obtener la categoría: ", err);
        alert("No se pudo cargar la categoría");
      }
    });
  }


  /** -------------------------
   * REGISTRAR NUEVA CATEGORÍA
   * ------------------------- **/
  public registrar(): void {
    // Validar categoría, el segundo parámetro indica si estamos editando o no
    this.errors = this.categoriesService.validarCategoria(this.categoria, this.editar);
    if (!$.isEmptyObject(this.errors)) return;

    if (this.editar) {
      // Si estamos editando, usamos editarCategoria
      this.categoriesService.editarCategoria(this.categoria).subscribe({
        next: (response) => {
          alert("Categoría actualizada correctamente");
          this.router.navigate(["categorias"]);
        },
        error: (err) => {
          console.error(err);
          alert("No se pudo actualizar la categoría");
        }
      });
    } else {
      // Si es nueva, usamos registrarCategoria
      this.categoriesService.registrarCategoria(this.categoria).subscribe({
        next: (response) => {
          alert("Categoría registrada correctamente");
          this.router.navigate(["/categories"]);
        },
        error: (err) => {
          console.error(err);
          alert("No se pudo registrar la categoría");
        }
      });
    }
  }


  /** -------------------------
   * ACTUALIZAR CATEGORÍA EXISTENTE
   * ------------------------- **/
  public actualizar(): void {
    this.errors = this.categoriesService.validarCategoria(this.categoria, this.editar);
    if (!$.isEmptyObject(this.errors)) return;

    // Llamamos al servicio de edición
    this.categoriesService.editarCategoria(this.categoria).subscribe({
      next: (response) => {
        alert("categoria actualizada correctamente");
        console.log("categoria actualizada: ", response);
        this.router.navigate(["categorias"]);
      },
      error: (err) => {
        console.error("Error al actualizar la categoria: ", err);
        alert("No se pudo actualizar la categoria");
      }
    });
  }

  public regresar(): void {
    this.location.back();
  }

  public soloLetras(event: KeyboardEvent): void {
    const charCode = event.key.charCodeAt(0);
    if (
      !(charCode >= 65 && charCode <= 90) &&
      !(charCode >= 97 && charCode <= 122) &&
      charCode !== 32
    ) {
      event.preventDefault();
    }
  }

  public signosBasicos(event: KeyboardEvent): void {
    const char = event.key;
    const regex = /^[a-zA-Z0-9 .,;:!?¡¿'"()\-_/]*$/;
    if (!regex.test(char)) event.preventDefault();
  }
}
