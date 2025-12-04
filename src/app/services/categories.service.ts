import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs'; // Importamos 'of' para la simulación
import { environment } from '../../environments/environment'; // Asumiendo tu entorno
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
export class CategoriesService {


  constructor(
    private http: HttpClient,
    private errorService: ErrorsService,
    private validatorService: ValidatorService,
    private authService: AuthService
  ) { }

  public esquemaCategoria() {
    return {
      'nombre_categoria': '',
      'descripcion': ''
    }
  }


  //Validacion para el formulario evento
  public validarCategoria(data: any, editar: boolean) {
    console.log("Validando categoria... ", data);

    let error: any = [];
    //NOMBRE DEL EVENTO
    if (!this.validatorService.required(data["nombre_categoria"])) {
      error["nombre_categoria"] = this.errorService.required;
    }
    //DESCRIPCION
    if (!this.validatorService.required(data["descripcion"])) {
      error["descripcion"] = this.errorService.required;
    }

    //Return arreglo
    return error;
  }


  //Servicio para registrar un nuevo evento
  public registrarCategoria(data: any): Observable<any> {

    const token = this.authService.getSessionToken();

    const formData = new FormData();
    formData.append('nombre_categoria', data.nombre_categoria);
    formData.append('descripcion', data.descripcion);

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
      // NO pongas Content-Type, Angular lo genera automáticamente
    });

    return this.http.post<any>(`${environment.url_api}/categorias/`, formData, { headers });
  }


  //Obtener lista de categoria
  public obtenerListaCategoria(): Observable<any> {
    return this.http.get<any>(`${environment.url_api}/lista-categorias/`);
  }

  //Obtener un solo categoria  dependiendo su ID
  public getCategoriaByID(idUser: Number) {
    return this.http.get<any>(`${environment.url_api}/categorias/?id=${idUser}`, httpOptions);
  }

  //Servicio para actualizar categoria
  public editarCategoria(data: any): Observable<any> {
    const token = this.authService.getSessionToken();

    const formData = new FormData();
    formData.append('id', data.id); // Asegúrate de enviar el id de la categoría
    formData.append('nombre_categoria', data.nombre_categoria);
    formData.append('descripcion', data.descripcion);

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
      // NO Content-Type, Angular lo genera automáticamente para FormData
    });

    return this.http.put<any>(`${environment.url_api}/categorias-edit/`, formData, { headers });
  }


  //Eliminar categoria
  public eliminarCategoria(idUser: number): Observable<any> {
    var token = this.authService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return this.http.delete<any>(`${environment.url_api}/categorias-edit/?id=${idUser}`, { headers: headers });
  }

}
