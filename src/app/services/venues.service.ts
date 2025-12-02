import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; // Eliminamos 'of'
import { environment } from '../../environments/environment';
import { FacadeService } from './facade.service';

// Define la interfaz para los datos de las aulas/sedes
export interface Aula {
  id: number; // Añadir un ID es crucial para editar/eliminar en el backend
  edificio: string;
  aula: string;
  capacidad: string;
  capacidadNumero: number; // Usado para cálculos en el front-end
  recursos: string;
  eventos: number; // Número de veces utilizada (para "Más Utilizada")
}

@Injectable({
  providedIn: 'root'
})
export class VenuesService {

  constructor(
    private http: HttpClient,
    private facadeService: FacadeService
  ) { }

  /**
   * Obtiene la lista de aulas/sedes desde la API.
   * IMPORTANTE: No contiene datos de simulación estáticos.
   */
  public obtenerListaAulas(): Observable<Aula[]>{

    // **USAR ESTO PARA API REAL:**
    // Asegúrate de que tu ambiente (environment.ts) tenga 'url_api' definido.
    const token = this.facadeService.getSessionToken();
    // ⚠️ RECUERDA: La API real debe devolver un array de objetos que coincidan
    // con la interfaz 'Aula', incluyendo 'capacidadNumero'.
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return this.http.get<Aula[]>(`${environment.url_api}/aulas/`, { headers: headers });
  }
}
