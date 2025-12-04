import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../partials/sidebar/sidebar.component';
import { CommonModule, DecimalPipe } from '@angular/common'; // CommonModule debe incluirse si usas *ngIf
import { DashboardService, RecentEvent } from '../../services/dashboard.service';
import { RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth.service';

interface DisplayEvent extends RecentEvent {
    name: string; // Asumo que el evento tiene un nombre para mostrar
    status: string; // Asumo que el evento tiene un estado para mostrar
    daysAgo: number;
}

@Component({
    selector: 'app-dashboard-screen',
    // Asegúrate de incluir CommonModule para que *ngIf funcione
    imports: [SidebarComponent, CommonModule],
    standalone: true,
    templateUrl: './dashboard-screen.component.html',
    styleUrls: ['./dashboard-screen.component.scss']
})
export class DashboardScreenComponent implements OnInit {
    public rol: string = "";

    // Hacemos el objeto ROLES público (public readonly) para que esté disponible en el template.
    public readonly ROLES = {
        ADMINISTRADOR: 'administrador',
        ORGANIZADOR: 'organizador',
        ESTUDIANTE: 'estudiante',
    } as const;

    // Métricas
    public totalEvents: number = 0;
    public totalEventsChange: string = '0%';
    public activeUsers: number = 0;
    public activeUsersChange: string = '0%';
    public registrations: number = 0;
    public registrationsChange: string = '0%';
    public attendanceRate: string = '0%';
    public attendanceRateChange: string = '0%';

    // Métricas específicas de Estudiante/Organizador
    public totalEventsRegistered: number = 0; // Eventos inscritos
    public totalEventsRegisteredChange: string = '0%';
    public totalUpcomingEvents: number = 0; // Próximos Eventos
    public totalUpcomingEventsChange: string = '0%';
    public totalEventsAttended: number = 0; // Eventos asistidos
    public totalEventsAttendedChange: string = '0%';

    public recentEvents: DisplayEvent[] = [];

    constructor(
        private dashboardService: DashboardService,
        public authService: AuthService,
    ) { }

    ngOnInit(): void {
        // Obtener el rol del usuario logueado. Esto es crucial para la visibilidad del HTML.
        this.rol = this.authService.getUserGroup();

        // Cargar los datos del dashboard
        this.loadDashboardData();
    }

    /**
     * @description Verifica si el rol actual del usuario coincide con el rol requerido.
     * Esta función es usada en el *ngIf del HTML.
     * @param requiredRole El rol que se debe chequear (ej: ROLES.ADMINISTRADOR).
     * @returns true si el usuario tiene el rol, false en caso contrario.
     */
    public hasRole(requiredRole: string): boolean {
        // Se recomienda convertir a minúsculas para una comparación robusta.
        return this.rol.toLowerCase() === requiredRole.toLowerCase();
    }

    public loadDashboardData(): void {
        this.dashboardService.getDashboardMetrics().subscribe({
            next: (metrics) => {
                // Asignación de Métricas
                this.totalEvents = metrics.totalEvents;
                this.totalEventsChange = metrics.totalEventsChange;
                this.activeUsers = metrics.activeUsers;
                this.activeUsersChange = metrics.activeUsersChange;
                this.registrations = metrics.registrations;
                this.registrationsChange = metrics.registrationsChange;
                this.attendanceRate = metrics.attendanceRate;
                this.attendanceRateChange = metrics.attendanceRateChange;

                // Asignación de Métricas específicas
                this.totalEventsRegistered = metrics.totalEventsRegistered;
                this.totalEventsRegisteredChange = metrics.totalEventsRegisteredChange;
                this.totalUpcomingEvents = metrics.totalUpcomingEvents;
                this.totalUpcomingEventsChange = metrics.totalUpcomingEventsChange;
                this.totalEventsAttended = metrics.totalEventsAttended;
                this.totalEventsAttendedChange = metrics.totalEventsAttendedChange;
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
        return events
            .map(event => {
                const createdDate = event.createdAt ? new Date(event.createdAt) : new Date();
                // Calcula la diferencia de tiempo en milisegundos y convierte a días
                const diffTime = Math.abs(today.getTime() - createdDate.getTime());
                const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

                return { ...event, daysAgo: diffDays } as DisplayEvent;
            })
            .sort((a, b) => a.daysAgo - b.daysAgo);
    }
}
