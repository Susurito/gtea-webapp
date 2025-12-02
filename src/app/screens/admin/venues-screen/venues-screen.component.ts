import { Component, OnInit} from '@angular/core';
import { SidebarComponent } from '../../../partials/sidebar/sidebar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { VenuesService} from '../../../services/venues.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

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
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarAulas();
  }

  cargarAulas(): void {
    this.venuesService.obtenerListaAulas().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.calcularMetricas(data);
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
    alert('Función: Abrir formulario o modal para crear nueva sede/aula.');
  }

  editarAula(aula: Aula) {
    alert(`Función: Abrir modal de edición para el aula ${aula.aula} (ID: ${aula.id}).`);
    // Aquí abrirías un modal con this.dialog.open(...)
  }

  eliminarAula(aula: Aula) {
    // Usar MatDialog para confirmación antes de eliminar
    alert(`Función: Abrir diálogo de confirmación para eliminar ${aula.aula} (ID: ${aula.id}).`);
    /*
    const dialogRef = this.dialog.open(ConfirmDeleteModalComponent, {
      data: { titulo: 'Eliminar Aula', mensaje: `¿Estás seguro de eliminar el aula ${aula.aula}?` }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Lógica de eliminación en el servicio
      }
    });
    */
  }
}
