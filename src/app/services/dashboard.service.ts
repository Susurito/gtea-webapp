import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

export interface RecentEvent {
  id: number;
  nombre_evento: string;
  categoria: string;
  organizador: string;
  fecha_evento: string;
  estado: string;
  inscritos?: number;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getSessionToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // Obtener totales de usuarios
  public getTotalUsuarios(): Observable<any> {
    return this.http.get<any>(`${environment.url_api}/admins-edit/`, { headers: this.getHeaders() });
  }

  // Obtener totales de eventos
  public getTotalEventos(): Observable<any> {
    return this.http.get<any>(`${environment.url_api}/eventos-edit/`, { headers: this.getHeaders() });
  }

  // Obtener últimos eventos para el dashboard
  public obtenerListaEventos(): Observable<RecentEvent[]> {
    return this.http.get<RecentEvent[]>(`${environment.url_api}/lista-eventos/`);
  }

  // Método que combina métricas de usuarios y eventos
  public getDashboardMetrics(): Observable<any> {
    return forkJoin({
      usuarios: this.getTotalUsuarios(),
      eventos: this.getTotalEventos()
    }).pipe(
      map(res => ({
        totalEvents: res.eventos['Total eventos'] || 0,
        activeUsers: res.usuarios['Total usuarios'] || 0,
        registrations: 0,        // Puedes calcular si tienes endpoint
        attendanceRate: '0%',    // Igual aquí

      }))
    );
  }
}
