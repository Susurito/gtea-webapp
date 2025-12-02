import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../../partials/navbar/navbar.component";
import { FooterComponent } from "../../../partials/footer/footer.component";
import { Router } from '@angular/router';
import { EventsService } from '../../../services/events.service';

interface EventItem {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  capacity: string;
  venue: string;
  status: string;
  modality: string;
  description: string;
}

@Component({
  selector: 'app-list-screen',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './list-screen.component.html',
  styleUrls: ['./list-screen.component.scss']
})
export class ListScreenComponent implements OnInit {

  searchTerm: string = '';
  categoryFilter: string = 'all';
  modalityFilter: string = 'all';

  // PAGINACIÓN
  currentPage = 1;
  itemsPerPage = 6;

  // EVENTOS REALES DEL BACKEND
  events: EventItem[] = [];
  filteredEvents: EventItem[] = [];

  constructor(
    private router: Router,
    private eventsService: EventsService
  ) {}

  ngOnInit(): void {
    this.obtenerEventos();
  }

  // ==================================================
  //      OBTENER EVENTOS DESDE TU API
  // ==================================================
  obtenerEventos() {
    this.eventsService.obtenerListaEventos().subscribe({
      next: (res) => {
        console.log("Eventos obtenidos:", res);

        this.events = res.map((item: any) => ({
          id: item.id,
          title: item.nombre_evento,
          category: item.categoria,
          date: item.fecha_evento ? this.formatDate(item.fecha_evento) : "Sin fecha",
          time:
            item.hora_inicio && item.hora_fin
              ? `${item.hora_inicio.substring(0, 5)} - ${item.hora_fin.substring(0, 5)}`
              : "Sin horario",
          capacity: `${item.cupo}`,
          venue: item.lugar,
          status: "Publicado",
          modality: item.modalidad ?? "No especificado",
          description: item.descripcion ?? ""
        }));

        this.filterEvents();
      },
      error: (err) => {
        console.error("Error al obtener eventos:", err);
      }
    });
  }

  // ==================================================
  //            FORMATEAR FECHA
  // ==================================================
  formatDate(dateStr: string): string {
    if (!dateStr) return "Sin fecha";

    const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun",
                   "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

    const date = new Date(dateStr + "T00:00:00");
    return `${date.getDate()} ${meses[date.getMonth()]} ${date.getFullYear()}`;
  }

  // ==================================================
  //                  FILTROS
  // ==================================================
  filterEvents() {
    let data = [...this.events];

    if (this.searchTerm.trim() !== '') {
      const term = this.searchTerm.toLowerCase();
      data = data.filter(ev =>
        ev.title.toLowerCase().includes(term) ||
        ev.category.toLowerCase().includes(term)
      );
    }

    if (this.categoryFilter !== 'all') {
      data = data.filter(ev => ev.category === this.categoryFilter);
    }

    if (this.modalityFilter !== 'all') {
      data = data.filter(ev => ev.modality === this.modalityFilter);
    }

    this.filteredEvents = data;
  }

  // ==================================================
  //               PAGINACIÓN
  // ==================================================
  get paginatedEvents(): EventItem[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredEvents.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredEvents.length / this.itemsPerPage);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) this.currentPage = page;
  }

  // ==================================================
  //           ABRIR DETALLE DEL EVENTO
  // ==================================================
  openEventDetail(id: string) {
    this.router.navigate(['/event-detail', id]);
  }
}
