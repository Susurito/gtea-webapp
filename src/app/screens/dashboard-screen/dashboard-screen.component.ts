import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../partials/sidebar/sidebar.component';
import { CommonModule, DecimalPipe } from '@angular/common';
import { DashboardService, RecentEvent } from '../../services/dashboard.service';
import { RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth.service';

interface DisplayEvent extends RecentEvent {
    daysAgo: number;
}

@Component({
  selector: 'app-dashboard-screen',
  imports: [SidebarComponent, CommonModule, DecimalPipe, RouterLink],
  standalone: true,
  templateUrl: './dashboard-screen.component.html',
  styleUrl: './dashboard-screen.component.scss'
})
export class DashboardScreenComponent implements OnInit {
 public rol:string = "";

  public totalEvents: number = 0;
  public totalEventsChange: string = '0%';
  public activeUsers: number = 0;
  public activeUsersChange: string = '0%';
  public registrations: number = 0;
  public registrationsChange: string = '0%';
  public attendanceRate: string = '0%';
  public attendanceRateChange: string = '0%';

  public recentEvents: DisplayEvent[] = [];

  constructor(
    private dashboardService: DashboardService,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.loadDashboardData();
    this.rol = this.authService.getUserGroup();
  }

  public loadDashboardData(): void {
    this.dashboardService.getDashboardMetrics().subscribe({
      next: (metrics) => {
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

    // Cargar eventos recientes
    this.dashboardService.obtenerListaEventos().subscribe({
      next: (events: RecentEvent[]) => {
        this.recentEvents = this.processRecentEvents(events);
      },
      error: (err) => console.error('Error cargando eventos recientes:', err)
    });
  }

  private processRecentEvents(events: RecentEvent[]): DisplayEvent[] {
    const today = new Date();
    return events.map(event => {
      const createdDate = event.createdAt ? new Date(event.createdAt) : new Date();
      const diffTime = Math.abs(today.getTime() - createdDate.getTime());
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      return { ...event, daysAgo: diffDays } as DisplayEvent;
    }).sort((a, b) => a.daysAgo - b.daysAgo);
  }
}
