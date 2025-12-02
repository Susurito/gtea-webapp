import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { FacadeService } from './facade.service';


export interface Kpi {
  title: string;
  value: number | string;
  change: string;
  context: string;
  icon: string;
}

export interface OrganizerStats {
  name: string;
  events: number;
  color: string;
}

export interface ReporteData {
    kpis: Kpi[];
    topOrganizers: OrganizerStats[];
    categoryDistribution: { name: string; value: number; color: string; }[];
}


@Injectable({
  providedIn: 'root'
})
export class ReportsService {

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


  public obtenerFiltroCategorias(): Observable<string[]> {
    // Retorna una lista de strings: ['Todas', 'Tecnología', 'Diseño', ...]
    return this.http.get<string[]>(`${environment.url_api}/reportes/filtros/categorias/`, { headers: this.getHeaders() });
  }


  public obtenerFiltroOrganizadores(): Observable<string[]> {
    // Retorna una lista de strings: ['Todos', 'Dra. Ana López', 'Dr. Carlos Martínez', ...]
    return this.http.get<string[]>(`${environment.url_api}/reportes/filtros/organizadores/`, { headers: this.getHeaders() });
  }


  public generarReporte(filtros: {
    fechaInicio: string;
    fechaFin: string;
    categoria: string;
    organizador: string
  }): Observable<ReporteData> {


    const params = new URLSearchParams(filtros).toString();

    return this.http.get<ReporteData>(`${environment.url_api}/reportes/generar/?${params}`, { headers: this.getHeaders() });
  }


  public exportarCSV(filtros: any): Observable<Blob> {
    const params = new URLSearchParams(filtros).toString();
    return this.http.get(`${environment.url_api}/reportes/exportar_csv/?${params}`, {
      headers: this.getHeaders(),
      responseType: 'blob'
    });
  }
}
