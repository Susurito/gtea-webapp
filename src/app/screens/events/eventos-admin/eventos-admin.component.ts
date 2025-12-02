import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDeleteModalComponent } from '../../../modals/confirm-delete-modal/confirm-delete-modal.component';

import { SidebarComponent } from '../../../partials/sidebar/sidebar.component';

// Servicios
import { FacadeService } from '../../../services/facade.service';
import { AdministradoresService } from '../../../services/administradores.service';
import { Observable } from 'rxjs';

/////////////////////
// Define la interfaz Evento
export interface Evento {
  id: number;
  titulo: string;
  categoria: string;
  organizador: string;
  fecha: string; 
  estado: 'Publicado' | 'Borrador' | 'Cancelado' | string;
  inscritos: number;
}
/////////////////////

@Component({
  selector: 'app-eventos-admin',
  standalone: true,
  imports: [SidebarComponent, CommonModule, FormsModule, MatIconModule, MatDialogModule, ConfirmDeleteModalComponent],
  templateUrl: './eventos-admin.component.html',
  styleUrls: ['./eventos-admin.component.scss']
})
export class EventosAdminComponent implements OnInit {

  public name_user: string = '';

  // Almacena todos los eventos que vienen del servicio
  public eventos: Evento[] = [];

  // Campos del filtro
  public searchTerm: string = '';
  public selectedDate: string = '';
  public selectedStatus: string = 'Todos los estados';

  constructor(
    private facadeService: FacadeService,
    private administradoresService: AdministradoresService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.name_user = this.facadeService.getUserCompleteName();
    //Lista de eventos xd
    this.obtenerEventos();
  }

  // Obtener eventos desde el servicio
  public obtenerEventos(){
        this.administradoresService.obtenerListaAdmins().subscribe({
      next: (response) => {
        this.eventos = response as Evento[];
        console.log('Eventos cargados:', this.eventos);
      },
      error: (err) => {
        console.error('Error al obtener eventos', err);
        alert('No se pudo obtener la lista de eventos');
      }
    });
  }

  // Getter: lista filtrada según searchTerm, fecha y status
  public get filteredEvents(): Evento[] {
    return this.eventos.filter(e => {
      // filtro por searchTerm (título, organizador o categoría)
      const term = this.searchTerm.trim().toLowerCase();
      if (term) {
        const matchesTerm =
          (e.titulo ?? '').toLowerCase().includes(term) ||
          (e.organizador ?? '').toLowerCase().includes(term) ||
          (e.categoria ?? '').toLowerCase().includes(term);
        if (!matchesTerm) return false;
      }

      // filtro por fecha
      if (this.selectedDate) {
        const fechaEvento = (e.fecha ?? '').split('T')[0];
        const selected = this.selectedDate.split('T')[0];
        if (selected && fechaEvento !== selected) return false;
      }

      // filtro por estado
      if (this.selectedStatus && this.selectedStatus !== 'Todos los estados') {
        if ((e.estado ?? '') !== this.selectedStatus) return false;
      }

      return true;
    });
  }

  // Muestra la columna "Publicar" si hay al menos un borrador
  get shouldShowPublishColumn(): boolean {
    return this.eventos?.some(e => e.estado === 'Borrador') ?? false;
  }

  // Navegar a editar (usa la ruta que tengas definida)
  public editarEvento(eventoId: number){
    this.router.navigate(['registro-eventos', eventoId]);
  }

  public editarUsuarios(eventoId: number){
    // Redirige a la pantalla de gestión de usuarios del evento si aplica
    this.router.navigate(['event-users', eventoId]);
  }

  public crearEvento(){
    // Redirige o abre modal para crear evento
    this.router.navigate(['registro-eventos', 'nuevo']);
  }

  public eliminarEvento(eventoId: number): void {
  const dialogRef = this.dialog.open(ConfirmDeleteModalComponent, {
    data: { id: eventoId },
    height: '288px',
    width: '328px'
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result?.isDelete) {
      this.obtenerEventos();
    }
  });
}
}
