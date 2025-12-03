import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../partials/sidebar/sidebar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { VenuesService } from '../../../services/venues.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

export interface Aula {
  id: number;
  edificio: string;
  aula: string;
  capacidad: string;
  capacidadNumero: number;
  recursos: string;
  eventos: number;
}

@Component({
  selector: 'app-venues-screen',
  imports: [SidebarComponent, MatButtonModule, MatIconModule, MatTableModule, CommonModule],
  standalone: true,
  templateUrl: './venues-screen.component.html',
  styleUrl: './venues-screen.component.scss'
})
export class VenuesScreenComponent implements OnInit {

  totalSedesAulas: number = 0;
  capacidadTotal: string = '0';
  masUtilizada: string = 'Cargando...';

  displayedColumns: string[] = [
    'edificio',
    'aula',
    'capacidad',
    'recursos',
    'eventos',
    'acciones',
  ];
  dataSource = new MatTableDataSource<Aula>([]);

  constructor(
    private venuesService: VenuesService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.cargarAulas();
  }

  cargarAulas(): void {
    this.venuesService.obtenerListaSede().subscribe({
      next: (data: any[]) => {
        const aulas: Aula[] = data.map(item => ({
          id: item.id,
          edificio: item.edificio,
          aula: item.aula,
          capacidad: item.capacidad,
          capacidadNumero: Number(item.capacidad) || 0,
          recursos: Array.isArray(item.recursos_json) ? item.recursos_json.join(', ') : item.recursos_json,
          eventos: item.eventos || 0,
        }));

        this.dataSource.data = aulas;
        this.calcularMetricas(aulas);
      },
      error: (err) => {
        console.error('Error al cargar sedes/aulas:', err);
      }
    });
  }

  private calcularMetricas(data: Aula[]): void {
    this.totalSedesAulas = data.length;
    const totalCapacidad = data.reduce((sum, aula) => sum + (aula.capacidadNumero || 0), 0);
    this.capacidadTotal = `${totalCapacidad} personas`;

    if (data.length > 0) {
      const masUsada = data.reduce((prev, current) =>
        (prev.eventos > current.eventos) ? prev : current
      );
      this.masUtilizada = `${masUsada.edificio} - ${masUsada.aula} (${masUsada.eventos} eventos)`;
    } else {
      this.masUtilizada = 'N/A';
    }
  }

  crearNuevaSedeAula() {
    this.router.navigate(['/register-sedes']);
  }

  editarAula(aula: Aula) {
    // Redirige al formulario con el ID para cargar los datos existentes
    this.router.navigate(['/register-sedes', aula.id]);
  }

  eliminarAula(aula: Aula) {
    // Aquí abrirías un diálogo de confirmación antes de eliminar
    alert(`Función: Abrir diálogo de confirmación para eliminar ${aula.aula} (ID: ${aula.id}).`);
  }
}
