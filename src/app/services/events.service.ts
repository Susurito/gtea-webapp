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
    if (!this.validatorService.required(data["nombre_evento"])) {
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
    if (!this.validatorService.required(data["hora_final"])) {
      error["hora_final"] = this.errorService.required;
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


  //Servicio para registrar un nuevo evento
  public registrarEvento(data: any): Observable<any> {
    return this.http.post<any>(`${environment.url_api}/eventos/`, data, httpOptions);
  }

  //Obtener lista de eventos
  public obtenerListaEventos(): Observable<any> {
    return this.http.get<any>(`${environment.url_api}/lista-eventos/`);
  }

  //Obtener un solo evento dependiendo su ID
  public getEventoByID(idUser: Number) {
    return this.http.get<any>(`${environment.url_api}/eventos/?id=${idUser}`, httpOptions);
  }

  //Servicio para actualizar evento
  public editarEvento(data: any): Observable<any> {
    var token = this.authService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return this.http.put<any>(`${environment.url_api}/eventos-edit/`, data, { headers: headers });
  }

  //Eliminar evento
  public eliminarEvento(idUser: number): Observable<any> {
    var token = this.authService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return this.http.delete<any>(`${environment.url_api}/eventos-edit/?id=${idUser}`, { headers: headers });
  }


  //CHECARRRRRR
  public publishEvent(eventId: number): Observable<any> {
    var token = this.authService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return this.http.post<any>(`${environment.url_api}/eventos-publish/?id=${eventId}`, {}, { headers: headers });
  }

}
