import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs'; // Importamos 'of' para la simulación
import { environment } from '../../environments/environment'; // Asumiendo tu entorno
import { FacadeService } from './facade.service';

export interface Categoria {
  id: number;
  nombre: string;
  descripcion: string;
  eventos: number;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private http: HttpClient,
    private facadeService: FacadeService
  ) { }


  public obtenerListaCategorias(): Observable<Categoria[]>{
    // Simulación de datos para probar el frontend sin API
    const simulatedData: Categoria[] = [
        { id: 1, nombre: 'Tecnología', descripcion: 'Eventos relacionados con desarrollo y tecnología', eventos: 15 },
        { id: 2, nombre: 'Inteligencia Artificial', descripcion: 'Machine Learning, Deep Learning, y más', eventos: 8 },
        { id: 3, nombre: 'Diseño', descripcion: 'UX/UI, diseño gráfico y visual', eventos: 6 },
        { id: 4, nombre: 'Negocios', descripcion: 'Emprendimiento, finanzas y gestión', eventos: 4 },
        { id: 5, nombre: 'Ciencia de Datos', descripcion: 'Análisis de datos y estadística', eventos: 7 },
    ];

    const token = this.facadeService.getSessionToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return this.http.get<Categoria[]>(`${environment.url_api}/categorias/`, { headers: headers });
  }
}
