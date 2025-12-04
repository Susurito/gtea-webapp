import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../../partials/sidebar/sidebar.component";
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; // <-- ¡Añadir esta importación!

interface EventDetail {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  status: 'Published' | 'Draft' | 'Finished';
  date: string;
  time: string;
  venue: string;
  capacityAvailable: number;
  capacityTotal: number;
  organizer: string;
  modality: 'Presencial' | 'Online' | 'Híbrido';
  description: string;
  requirements: string[];
  isRegistered: boolean;
}


@Component({
  selector: 'app-detalles-eventos',
  imports: [SidebarComponent, CommonModule],
  templateUrl: './detalles-eventos.component.html',
  styleUrls: ['./detalles-eventos.component.scss']
})
export class DetallesEventosComponent implements OnInit {


  eventData!: EventDetail; // Los datos del evento

 // Mapeo de iconos (se mantiene igual, ya que es una variable local)
  iconMap: { [key: string]: string } = {
    fecha: '📅',
    horario: '🕒',
    sede: '📍',
    cupo: '👥',
    organizador: '👨‍🏫',
    modalidad: '💻'
  };

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Los datos de ejemplo usan la nueva estructura
    this.eventData = {
      id: 'EVT-001', // Ejemplo de ID
      title: 'Workshop de React Avanzado',
      imageUrl: 'https://via.placeholder.com/800x300/e0e0e0/e0e0e0',
      category: 'Tecnología',
      status: 'Published', // Nuevo: 'Published'
      date: '15 de Octubre, 2025',
      time: '14:00 - 17:00',
      venue: 'Aula 101, Edificio A',
      capacityAvailable: 30, // Nuevo: capacityAvailable
      capacityTotal: 50,     // Nuevo: capacityTotal
      organizer: 'Dr. Carlos Martínez',
      modality: 'Presencial',
      description: 'Este workshop está diseñado para desarrolladores con conocimientos básicos de React...',
      requirements: [ // Nuevo: requirements
        'Conocimientos básicos de React',
        'Laptop con Node.js instalado',
        'Editor de código (VS Code recomendado)'
      ],
      isRegistered: false // Nuevo: isRegistered
    };
  }


// Función para manejar la acción de inscripción, adaptada a los nuevos nombres
  inscribirse(): void {
    // Usar this.eventData.capacityAvailable y this.eventData.isRegistered
    if (this.eventData.capacityAvailable > 0) {
      alert(`Te has inscrito al evento: ${this.eventData.title}`);
      this.eventData.isRegistered = true;
      this.eventData.capacityAvailable--;
    } else {
      alert('¡Lo sentimos! El cupo para este evento está lleno.');
    }
  }

  goBack(): void {
    console.log('Navegando de vuelta a Eventos...');
  }

  // Función para obtener la clase del estado (badge), adaptada a los nuevos nombres
  getStateClass(status: string): string {
    switch (status) {
      case 'Published': // Nuevo: 'Published'
        return 'badge-published';
      case 'Finished':  // Nuevo: 'Finished'
        return 'badge-finished';
      case 'Draft':     // Nuevo: 'Draft'
        return 'badge-draft';
      default:
        return '';
    }
  }


}
