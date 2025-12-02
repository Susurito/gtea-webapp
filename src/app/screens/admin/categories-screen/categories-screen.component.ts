import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../../partials/sidebar/sidebar.component";
import { CommonModule } from '@angular/common';
import { CategoriesService, Categoria } from '../../../services/categories.service';
import { Router } from '@angular/router'; // Para navegación, si es necesario
import { MatDialog } from '@angular/material/dialog'; // Para modales de confirmación/edición

@Component({
  selector: 'app-categories-screen',
  imports: [SidebarComponent, CommonModule],
  standalone: true, // Asumiendo que usas componentes Standalone
  templateUrl: './categories-screen.component.html',
  styleUrl: './categories-screen.component.scss'
})
export class CategoriesScreenComponent implements OnInit {

  public categorias: Categoria[] = [];

  public totalCategorias: number = 0;
  public categoriaMasUsada: string = 'Cargando...';
  public totalEventos: number = 0;

  constructor(
    private categoriesService: CategoriesService,
    private router: Router,
    private dialog: MatDialog // Si usas modales
  ) { }

  ngOnInit(): void {
    this.cargarCategorias();
  }


  public cargarCategorias(): void {
    this.categoriesService.obtenerListaCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
        this.calcularMetricas(data);
      },
      error: (err) => {
        console.error('Error al cargar las categorías:', err);

      }
    });
  }


  private calcularMetricas(data: Categoria[]): void {
    this.totalCategorias = data.length;

    this.totalEventos = data.reduce((sum, cat) => sum + cat.eventos, 0);

    if (data.length > 0) {
      const masUsada = data.reduce((prev, current) =>
        (prev.eventos > current.eventos) ? prev : current
      );
      this.categoriaMasUsada = masUsada.nombre;
    } else {
      this.categoriaMasUsada = 'N/A';
    }
  }


  public crearCategoria(): void {
    console.log('Navegar a la pantalla de creación de categoría o abrir modal.');
    // Usar router.navigate(['/crear-categoria']) o abrir un modal
    alert('Función crearCategoria ejecutada'); // Reemplazar con modal
  }

  public editarCategoria(id: number): void {
    console.log('Editando categoría con ID:', id);
    // Usar router.navigate(['/editar-categoria', id]) o abrir un modal
    alert(`Función editarCategoria para ID ${id} ejecutada`); // Reemplazar con modal
  }

  public eliminarCategoria(id: number, nombre: string): void {
    console.log('Eliminando categoría con ID:', id);
    // Usar MatDialog para pedir confirmación antes de eliminar
    alert(`Función eliminarCategoria para ${nombre} ejecutada. Usar MatDialog para Confirmación.`); // Reemplazar con modal
  }

}
