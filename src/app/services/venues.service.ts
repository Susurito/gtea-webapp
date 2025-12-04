import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; // Eliminamos 'of'
import { environment } from '../../environments/environment';
import { FacadeService } from './facade.service';
import { AuthService } from './auth.service';
import { ErrorsService } from './tools/errors.service';
import { ValidatorService } from './tools/validator.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class VenuesService {


  constructor(
    private http: HttpClient,
    private errorService: ErrorsService,
    private validatorService: ValidatorService,
    private authService: AuthService
  ) { }

  public esquemaSede() {
    return {
      'edificio': '',
      'aula': '',
      'capacidad': '',
      'recursos_json': [],
    }
  }


  //Validacion para el formulario evento
  public validarSede(data: any, editar: boolean) {
    console.log("Validando sede... ", data);

    let error: any = [];
    //NOMBRE DEL EVENTO
    if (!this.validatorService.required(data["edificio"])) {
      error["edificio"] = this.errorService.required;
    }
    //DESCRIPCION
    if (!this.validatorService.required(data["aula"])) {
      error["aula"] = this.errorService.required;
    }
    //NOMBRE DEL EVENTO
    if (!this.validatorService.required(data["capacidad"])) {
      error["capacidad"] = this.errorService.required;
    }
    //RECURSOS
    // Aseguramos que recurso_json sea array y tenga al menos un elemento
    if (!Array.isArray(data.recursos_json) || data.recursos_json.length === 0) {
      error.recursos_json = "Debes seleccionar algún público para poder registrarte";
    }

    //Return arreglo
    return error;
  }


public registrarSede(data: any): Observable<any> {
  const token = this.authService.getSessionToken();

  const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + token
    // NO pongas Content-Type si usas FormData
  });

  // Usar FormData solo si el backend espera multipart/form-data
  const formData = new FormData();
  formData.append('edificio', data.edificio);
  formData.append('aula', data.aula);
  formData.append('capacidad', data.capacidad);
  formData.append('recursos_json', JSON.stringify(data.recursos_json));

  // Cambia la URL a la correcta de tu backend
  return this.http.post<any>(`${environment.url_api}/sedes/`, formData, { headers });
}



  //Obtener lista de eventos
  public obtenerListaSede(): Observable<any> {
    return this.http.get<any>(`${environment.url_api}/lista-sedes/`);
  }

  //Obtener un solo evento dependiendo su ID
  public getEventoByID(idUser: Number) {
    return this.http.get<any>(`${environment.url_api}/sedes/?id=${idUser}`, httpOptions);
  }

  //Servicio para actualizar evento
  public editarSede(data: any): Observable<any> {
    var token = this.authService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return this.http.put<any>(`${environment.url_api}/sedes-edit/`, data, { headers: headers });
  }

  //Eliminar evento
  public eliminarSede(idUser: number): Observable<any> {
    var token = this.authService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return this.http.delete<any>(`${environment.url_api}/sede-edit/?id=${idUser}`, { headers: headers });
  }

}
