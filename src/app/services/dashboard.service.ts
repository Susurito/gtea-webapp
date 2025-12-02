import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { FacadeService } from './facade.service';


export interface Metrics {
  totalEvents: number;
  totalEventsChange: string;
  activeUsers: number;
  activeUsersChange: string;
  registrations: number;
  registrationsChange: string;
  attendanceRate: string;
  attendanceRateChange: string;
}

export interface RecentEvent {
  id: number;
  name: string;
  status: 'Publicado' | 'Borrador' | 'Cancelado';
  createdAt: string;
}


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private http: HttpClient,
    private facadeService: FacadeService
  ) { }

  private getHeaders(): HttpHeaders {
    const token = this.facadeService.getSessionToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
  }


  public getDashboardMetrics(): Observable<Metrics> {
    return this.http.get<Metrics>(`${environment.url_api}/dashboard/metrics/`, { headers: this.getHeaders() });
  }

  public obtenerListaEventos(): Observable<any> {
    return this.http.get<any>(`${environment.url_api}/lista-eventos/`);
  }
}
