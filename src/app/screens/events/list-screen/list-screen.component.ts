import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../../partials/navbar/navbar.component";
import { FooterComponent } from "../../../partials/footer/footer.component";
import { Router } from '@angular/router';

interface EventItem {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  capacity: string;
  venue: string;
  status: string;
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

  // EVENTOS
  events: EventItem[] = [
    {
      id: "1",
      title: "Workshop de React Avanzado",
      category: "Tecnología",
      date: "15 Oct 2025",
      time: "14:00 - 17:00",
      capacity: "30/50",
      venue: "Aula 101, Edificio A",
      status: "Publicado"
    },
    {
      id: "2",
      title: "Seminario de Inteligencia Artificial",
      category: "IA",
      date: "20 Oct 2025",
      time: "10:00 - 13:00",
      capacity: "45/60",
      venue: "Auditorio Principal",
      status: "Publicado"
    },
    {
      id: "3",
      title: "Taller de Diseño UX/UI",
      category: "Diseño",
      date: "25 Oct 2025",
      time: "15:00 - 18:00",
      capacity: "20/30",
      venue: "Lab de Diseño 202",
      status: "Publicado"
    },
    {
      id: "4",
      title: "Conferencia de Ciberseguridad",
      category: "Tecnología",
      date: "30 Oct 2025",
      time: "09:00 - 12:00",
      capacity: "50/80",
      venue: "Auditorio B",
      status: "Publicado"
    },
  ];

  filteredEvents: EventItem[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.filterEvents();
  }

  // FILTROS
  filterEvents() {
    let data = [...this.events];

    // Buscar
    if (this.searchTerm.trim() !== '') {
      const term = this.searchTerm.toLowerCase();
      data = data.filter(ev =>
        ev.title.toLowerCase().includes(term) ||
        ev.category.toLowerCase().includes(term)
      );
    }

    // Filtro categoría
    if (this.categoryFilter !== 'all') {
      data = data.filter(ev => ev.category === this.categoryFilter);
    }

    // Modalidad (si tuvieras campo, ahorita solo se deja listo)
    if (this.modalityFilter !== 'all') {
      // ejemplo: data = data.filter(ev => ev.modality === this.modalityFilter);
    }

    this.filteredEvents = data;
  }

  // PAGINACIÓN
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

  // CLICK CARD
  openEventDetail(id: string) {
    this.router.navigate(['/event-detail', id]);
  }
}
