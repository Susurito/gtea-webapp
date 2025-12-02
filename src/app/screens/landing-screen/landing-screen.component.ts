import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../partials/navbar/navbar.component";
import { FooterComponent } from "../../partials/footer/footer.component";
import { Router, RouterLink } from "@angular/router";
import { EventsService } from '../../services/events.service';

type Evento = {
  id: string;
  titulo: string;
  tipo: string;
  fecha: string;
  lugar: string;
  img: string;
};

@Component({
  selector: 'app-landing-screen',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterLink, CommonModule],
  templateUrl: './landing-screen.component.html',
  styleUrl: './landing-screen.component.scss'
})
export class LandingScreenComponent implements OnInit {

  eventos: Evento[] = [];

  constructor(
    private eventsService: EventsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerEventos();
  }

  // ==================================================
  //      OBTENER EVENTOS DEL BACKEND (PÚBLICO)
  // ==================================================
  obtenerEventos() {
    this.eventsService.obtenerListaEventos().subscribe({
      next: (res) => {
        // Convertimos igual que en ListScreen
        const parsed = res.map((item: any) => ({
          id: item.id,
          titulo: item.nombre_evento,
          tipo: item.categoria,
          fecha: this.formatFecha(item.fecha_evento),
          lugar: item.lugar,
          img: item.imagen_url ?? "assets/landing/default.jpg"
        }));

        // Solo mostramos los primeros 3 en la landing
        this.eventos = parsed.slice(0, 3);
      },
      error: (err) => console.error("Error obteniendo eventos:", err)
    });
  }

  // ==================================================
  //            FORMATEAR FECHA
  // ==================================================
  formatFecha(fechaStr: string): string {
    if (!fechaStr) return "Sin fecha";

    const meses = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
    const d = new Date(fechaStr + "T00:00:00");

    return `${d.getDate()} ${meses[d.getMonth()]} ${d.getFullYear()}`;
  }

  // ==================================================
  //                  ACCIONES
  // ==================================================
  verEvento(id: string) {
    this.router.navigate(['/event-detail', id]);
  }

  verCatalogo() {
    this.router.navigate(['/events']);
  }
}
