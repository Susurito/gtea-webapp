import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { SidebarComponent } from '../../../partials/sidebar/sidebar.component';
import { ConfirmDeleteModalComponent } from '../../../modals/confirm-delete-modal/confirm-delete-modal.component';
import { RouterModule } from '@angular/router';

// Servicios correctos
import { FacadeService } from '../../../services/facade.service';
import { EventsService } from '../../../services/events.service';

export interface Evento {
  id: number;
  titulo: string;
  categoria: string;
  organizador: string;
  fecha: string;
  estado: string;
  inscritos: number;
}

@Component({
  selector: 'app-eventos-admin',
  standalone: true,
  imports: [
    SidebarComponent,
    CommonModule,
    FormsModule,
    MatIconModule,
    MatDialogModule,
    RouterModule
  ],
  templateUrl: './eventos-admin.component.html',
  styleUrls: ['./eventos-admin.component.scss']
})
export class EventosAdminComponent implements OnInit {

  public name_user: string = '';
  public eventos: Evento[] = [];

  public searchTerm: string = '';
  public selectedDate: string = '';
  public selectedStatus: string = 'Todos los estados';

  constructor(
    private facadeService: FacadeService,
    private eventsService: EventsService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.name_user = this.facadeService.getUserCompleteName();
    this.obtenerEventos();
  }

  // ==================================================
  //      OBTENER EVENTOS DEL BACKEND (CORRECTO)
  // ==================================================
  public obtenerEventos() {
    this.eventsService.obtenerListaEventos().subscribe({
      next: (res) => {
        console.log("Eventos obtenidos:", res);

        this.eventos = res.map((item: any) => ({
          id: item.id,
          titulo: item.nombre_evento,
          categoria: item.categoria,
          organizador: item.organizador ?? "No asignado",
          fecha: item.fecha_evento,
          estado: item.estado ?? "Publicado",
          inscritos: item.inscritos ?? 0
        }));

      },
      error: (err) => {
        console.error("Error al obtener eventos:", err);
        alert("No se pudo obtener la lista de eventos");
      }
    });
  }

  // ==================================================
  //      FILTROS
  // ==================================================
  public get filteredEvents(): Evento[] {
    return this.eventos.filter(e => {

      // Search term
      const term = this.searchTerm.trim().toLowerCase();
      if (term) {
        if (
          !e.titulo.toLowerCase().includes(term) &&
          !e.categoria.toLowerCase().includes(term) &&
          !e.organizador.toLowerCase().includes(term)
        ) {
          return false;
        }
      }

      // Fecha
      if (this.selectedDate) {
        const fechaEvento = (e.fecha ?? '').split('T')[0];
        if (fechaEvento !== this.selectedDate) return false;
      }

      // Estado
      if (this.selectedStatus !== 'Todos los estados') {
        if (e.estado !== this.selectedStatus) return false;
      }

      return true;
    });
  }

  // Mostrar columna publicar
  get shouldShowPublishColumn(): boolean {
    return this.eventos.some(e => e.estado === 'Borrador');
  }

  // ==================================================
  //      ACCIONES
  // ==================================================
  public editarEvento(eventoId: number) {
    this.router.navigate(['register-logeado-evento', eventoId]);

  }

  public editarUsuarios(eventoId: number) {
    this.router.navigate(['event-users', eventoId]);
  }

  public crearEvento() {
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
