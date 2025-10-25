import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { NavbarComponent } from "../../partials/navbar/navbar.component";
import { FooterComponent } from "../../partials/footer/footer.component";
import { RouterLink } from "@angular/router";

type Evento = {
  titulo: string;
  tipo: string;
  fecha: string;
  lugar: string;
  img: string;
};

@Component({
  selector: 'app-landing-screen',
  imports: [NavbarComponent, FooterComponent, RouterLink],
  templateUrl: './landing-screen.component.html',
  styleUrl: './landing-screen.component.scss'
})
export class LandingScreenComponent {
  // Sustituir rutas por las imágenes locales del proyecto:
  // Copiar las imágenes adjuntas a assets/landing/ y mapear aquí.
  eventos: Evento[] = [
    {
      titulo: 'Conferencia Internacional de Inteligencia Artificial',
      tipo: 'Conferencia',
      fecha: '12 de Noviembre, 2025',
      lugar: 'Auditorio Principal',
      img: 'assets/landing/evento-1.jpg',
    },
    {
      titulo: 'Seminario de Investigación Científica',
      tipo: 'Seminario',
      fecha: '18 de Noviembre, 2025',
      lugar: 'Aula Magna',
      img: 'assets/landing/evento-2.jpg',
    },
    {
      titulo: 'Workshop de Desarrollo Web Moderno',
      tipo: 'Workshop',
      fecha: '28 de Octubre, 2025',
      lugar: 'Centro de Tecnología',
      img: 'assets/landing/evento-3.jpg',
    },
    {
      titulo: 'Jornada de Innovación Educativa',
      tipo: 'Jornada',
      fecha: '3 de Diciembre, 2025',
      lugar: 'Sala Innovación',
      img: 'assets/landing/evento-4.jpg',
    },
  ];

  // CTA handlers: reemplazar por navegación real (Router) o servicios de auth
  onRegistrarse(): void {
    // this.router.navigate(['/auth/register']);
    alert('Abrir registro');
  }

  onIngresar(): void {
    // this.router.navigate(['/auth/login']);
    alert('Abrir login');
  }

  onComenzar(): void {
    // this.router.navigate(['/eventos']);
    window.location.hash = '#eventos';
  }

  verEvento(ev: Evento): void {
    // this.router.navigate(['/eventos', evId]);
    alert(`Ver detalles: ${ev.titulo}`);
  }

  verCatalogo(): void {
    // this.router.navigate(['/eventos']);
    alert('Ver catálogo completo');
  }

}
