import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ErrorsService } from './tools/errors.service';
import { ValidatorService } from './tools/validator.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(
    private http: HttpClient,
    private errorService: ErrorsService,
    private validatorService: ValidatorService,
    private authService: AuthService
  ) { }

  public esquemaEvento() {
    return {
      'nombre_evento': '',
      'descripcion': '',
      'categoria': '',
      'organizador': '',
      'modalidad': '',
      'lugar': '',
      'fecha_evento': '',
      'hora_inicio': '',
      'hora_fin': '',
      'cupo': '',
      'publico_json': [],
    }
  }


  //Validacion para el formulario evento
  public validarEvento(data: any, editar: boolean) {
    console.log("Validando evento... ", data);

    let error: any = [];
    //NOMBRE DEL EVENTO
    if (!this.validatorService.required(data["nombre_evento"])) {
      error["nombre_evento"] = this.errorService.required;
    }
    //DESCRIPCION
    if (!this.validatorService.required(data["descripcion"])) {
      error["descripcion"] = this.errorService.required;
    }
    //TIPO DE EVENTO
    if (!this.validatorService.required(data["categoria"])) {
      error["categoria"] = this.errorService.required;
    }
    //ORGANIZADOR
    if (!this.validatorService.required(data["organizador"])) {
      error["organizador"] = this.errorService.required;
    }
    //LUGAR
    if (!this.validatorService.required(data["lugar"])) {
      error["lugar"] = this.errorService.required;
    }
    //MODALIDAD
    if (!this.validatorService.required(data["modalidad"])) {
      error["modalidad"] = this.errorService.required;
    }
    //FECHA DE EVENTO
    if (!this.validatorService.required(data["fecha_evento"])) {
      error["fecha_evento"] = this.errorService.required;
    }
    //HORA INICIO
    if (!this.validatorService.required(data["hora_inicio"])) {
      error["hora_inicio"] = this.errorService.required;
    }
    //HORA FINAL
    if (!this.validatorService.required(data["hora_fin"])) {
      error["hora_fin"] = this.errorService.required;
    }
    //CUPO
    if (!this.validatorService.required(data["cupo"])) {
      error["cupo"] = this.errorService.required;
    }
    //PUBLICO
    // Aseguramos que publico_json sea array y tenga al menos un elemento
    if (!Array.isArray(data.publico_json) || data.publico_json.length === 0) {
      error.publico_json = "Debes seleccionar algún público para poder registrarte";
    }

    //Return arreglo
    return error;
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getSessionToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }



  //Obtener lista de eventos
  public obtenerListaEventos(): Observable<any> {
    return this.http.get<any>(`${environment.url_api}/lista-eventos/`);
  }
public getEventoByID(idUser: number): Observable<any> {
  return this.http.get<any>(`${environment.url_api}/eventos/?id=${idUser}`, {
    headers: this.getAuthHeaders()
  });
}

public registrarEvento(data: FormData): Observable<any> {
  return this.http.post<any>(`${environment.url_api}/eventos/`, data, { headers: this.getAuthHeaders() });
}

public editarEvento(id: number, data: FormData): Observable<any> {
  return this.http.put<any>(`${environment.url_api}/eventos-edit/?id=${id}`, data, { headers: this.getAuthHeaders() });
}

public eliminarEvento(idUser: number): Observable<any> {
  return this.http.delete<any>(`${environment.url_api}/eventos-edit/?id=${idUser}`, { headers: this.getAuthHeaders() });
}


}
