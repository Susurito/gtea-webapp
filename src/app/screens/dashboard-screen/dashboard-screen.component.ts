import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../partials/sidebar/sidebar.component';
import { CommonModule, DecimalPipe } from '@angular/common';
import { DashboardService, Metrics, RecentEvent } from '../../services/dashboard.service';

// Interfaz extendida para el front-end
interface DisplayEvent extends RecentEvent {
    daysAgo: number;
}

@Component({
  selector: 'app-dashboard-screen',
  // Aseguramos CommonModule y DecimalPipe para el formato de números
  imports: [SidebarComponent, CommonModule, DecimalPipe],
  standalone: true, // Asumiendo standalone
  templateUrl: './dashboard-screen.component.html',
  styleUrl: './dashboard-screen.component.scss'
})
export class DashboardScreenComponent implements OnInit {

  // --- Propiedades Dinámicas (Inicializadas para evitar errores) ---
  public totalEvents: number = 0;
  public totalEventsChange: string = '0%';

  public activeUsers: number = 0;
  public activeUsersChange: string = '0%';

  public registrations: number = 0; 
  public registrationsChange: string = '0%';

  public attendanceRate: string = '0%';
  public attendanceRateChange: string = '0%';

  // Array para los Eventos Recientes
  public recentEvents: DisplayEvent[] = [];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  /**
   * Carga todas las métricas y eventos recientes desde el servicio.
   */
  public loadDashboardData(): void {
    // 1. Cargar Métricas (KPIs)
    this.dashboardService.getDashboardMetrics().subscribe({
      next: (metrics: Metrics) => {
        // Asignación de valores directos desde la API
        this.totalEvents = metrics.totalEvents;
        this.totalEventsChange = metrics.totalEventsChange;
        this.activeUsers = metrics.activeUsers;
        this.activeUsersChange = metrics.activeUsersChange;
        this.registrations = metrics.registrations;
        this.registrationsChange = metrics.registrationsChange;
        this.attendanceRate = metrics.attendanceRate;
        this.attendanceRateChange = metrics.attendanceRateChange;
      },
      error: (err) => console.error('Error cargando métricas del dashboard:', err)
    });

    // 2. Cargar Eventos Recientes
    this.dashboardService.getRecentEvents().subscribe({
      next: (events: RecentEvent[]) => {
        // Procesar los datos para calcular el tiempo transcurrido
        this.recentEvents = this.processRecentEvents(events);
      },
      error: (err) => console.error('Error cargando eventos recientes:', err)
    });
  }

  /**
   * Procesa los eventos para calcular cuántos días han pasado desde su creación.
   * @param events Lista de eventos con fecha de creación (createdAt).
   * @returns Lista de eventos lista para mostrar.
   */
  private processRecentEvents(events: RecentEvent[]): DisplayEvent[] {
    const today = new Date();

    return events.map(event => {
      const createdDate = new Date(event.createdAt);
      // Calcula la diferencia en milisegundos
      const diffTime = Math.abs(today.getTime() - createdDate.getTime());
      // Convierte milisegundos a días
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      return {
        ...event,
        daysAgo: diffDays,
      } as DisplayEvent;
    }).sort((a, b) => a.daysAgo - b.daysAgo); // Ordenar por más reciente (menos días)
  }
}
