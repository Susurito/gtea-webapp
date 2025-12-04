import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../../partials/sidebar/sidebar.component";
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CategoriesService } from '../../../services/categories.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteModalComponent } from '../../../modals/confirm-delete-modal/confirm-delete-modal.component';

export interface Categoria {
  id: number;
  nombre_categoria: string;
  descripcion: string;
  eventos?: number; // total de eventos asociados
}

@Component({
  selector: 'app-categories-screen',
  standalone: true,
  imports: [SidebarComponent, CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './categories-screen.component.html',
  styleUrl: './categories-screen.component.scss'
})
export class CategoriesScreenComponent implements OnInit {

  categorias: Categoria[] = [];
  totalCategorias: number = 0;
  categoriaMasUsada: string = 'Cargando...';
  totalEventos: number = 0;

  displayedColumnsCategorias: string[] = ['nombre', 'descripcion', 'eventos', 'acciones'];
  dataSourceCategorias = new MatTableDataSource<Categoria>([]);

  constructor(
    private categoriesService: CategoriesService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.cargarCategorias();
  }

  /** -------------------------
   * OBTENER CATEGORÍAS DEL BACKEND
   * ------------------------- **/
  cargarCategorias(): void {
    this.categoriesService.obtenerListaCategoria().subscribe({
      next: (data: Categoria[]) => {
        console.log("Categorías obtenidas:", data);
        this.categorias = data;
        this.dataSourceCategorias.data = data;
        this.calcularMetricas(data);
      },
      error: (err) => {
        console.error('Error al cargar las categorías:', err);
      }
    });
  }

  /** -------------------------
   * CALCULAR MÉTRICAS
   * ------------------------- **/
  private calcularMetricas(data: Categoria[]): void {
    this.totalCategorias = data.length;
    this.totalEventos = data.reduce((sum, cat) => sum + (cat.eventos ?? 0), 0);

    if (data.length > 0) {
      const masUsada = data.reduce((prev, current) => {
        const prevEventos = prev.eventos ?? 0;
        const currentEventos = current.eventos ?? 0;
        return prevEventos > currentEventos ? prev : current;
      });
      this.categoriaMasUsada = masUsada.nombre_categoria || 'N/A';
    } else {
      this.categoriaMasUsada = 'N/A';
    }
  }

  /** -------------------------
   * CREAR CATEGORÍA
   * ------------------------- **/
  crearCategoria(): void {
    this.router.navigate(['/register-categorias']);
  }

  /** -------------------------
   * EDITAR CATEGORÍA
   * ------------------------- **/
  editarCategoria(categoria: Categoria): void {
    this.router.navigate(['/register-categorias', categoria.id]);
  }


/** -------------------------
 * ELIMINAR CATEGORÍA
 * ------------------------- **/
public eliminarCategoria(id: number, nombre: string): void {
  const dialogRef = this.dialog.open(ConfirmDeleteModalComponent, {
    data: { id, mensaje: `¿Seguro que deseas eliminar la categoría "${nombre}"?` },
    width: '328px',
    height: '288px'
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === true) {
      this.categoriesService.eliminarCategoria(id).subscribe({
        next: () => {
          alert("Categoría eliminada correctamente");
          this.cargarCategorias(); // refresca la lista
        },
        error: (err) => {
          console.error("Error al eliminar categoría:", err);
          alert("No se pudo eliminar la categoría");
        }
      });
    }
  });
}

}
