import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EventsService } from '../../../services/events.service';

@Component({
  selector: 'app-detail',
  standalone: true,            // <-- Esto permite que sea independiente
  imports: [CommonModule],      // <-- Importa CommonModule para *ngIf, *ngFor
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  event: any;
  isAuthenticated = true; // O puedes traerlo desde AuthService

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventsService: EventsService
  ) {}

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.eventsService.getEventoByID(+eventId).subscribe({
        next: (data) => {
          this.event = Array.isArray(data) ? data[0] : data;
        },
        error: (err) => {
          console.error('Error al cargar evento:', err);
        }
      });
    }
  }

  goTo(view: string) {
    this.router.navigate([view]);
  }

  onEnrollClick() {
    console.log('Inscribiendo usuario al evento', this.event.id);
    // Aquí va la lógica de inscripción
  }
}
