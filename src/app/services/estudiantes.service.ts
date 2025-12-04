import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ErrorsService } from './tools/errors.service';
import { ValidatorService } from './tools/validator.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {

  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
    private authService: AuthService
  ) { }

  public esquemaEstudiante() {
    return {
      'rol': '',
      'first_name': '',
      'last_name': '',
      'email': '',
      'password': '',
      'confirm_password': '',
    }
  }



  //Validación para el formulario estudiantes
  public validarEstudiante(data: any, editar: boolean) {
    console.log("Validando estudiante... ", data);

    let error: any = [];

    if (!this.validatorService.required(data["first_name"])) {
      error["first_name"] = this.errorService.required;
    }

    if (!this.validatorService.required(data["last_name"])) {
      error["last_name"] = this.errorService.required;
    }

    if (!this.validatorService.required(data["email"])) {
      error["email"] = this.errorService.required;
    } else if (!this.validatorService.max(data["email"], 40)) {
      error["email"] = this.errorService.max(40);
    } else if (!this.validatorService.email(data['email'])) {
      error['email'] = this.errorService.email;
    }

    if (!editar) {
      if (!this.validatorService.required(data["password"])) {
        error["password"] = this.errorService.required;
      }

      if (!this.validatorService.required(data["confirm_password"])) {
        error["confirm_password"] = this.errorService.required;
      }
    }

    // VALIDAR CHECKBOX
    if (!data["terms"]) {
      error["terms"] = this.errorService.terms;
    }

    //Return arreglo
    return error;
  }



  //Aquí van los servicios HTTP
  //Servicio para registrar un nuevo usuario
  public registrarEstudiantes(data: any): Observable<any> {
    return this.http.post<any>(`${environment.url_api}/Estudiantes/`, data, httpOptions);
  }

  //Obtener lista estudiantes
  public obtenerListaEstudiantes(): Observable<any> {
    var token = this.authService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return this.http.get<any>(`${environment.url_api}/lista-Estudiantes/`, { headers: headers });
  }


//Obtener un solo usuario dependiendo su ID
public getEstudianteByID(idUser: Number){
return this.http.get<any>(`${environment.url_api}/Estudiantes/?id=${idUser}`,httpOptions);
}

//Servicio para actualizar un usuario
public editarEstudiante (data: any): Observable <any>{
var token = this.authService.getSessionToken();
var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
return this.http.put<any>(`${environment.url_api}/Estudiantes-edit/`, data, {headers:headers});
}
//Eliminar Admin
public eliminarEstudiante(idUser: number): Observable <any>{
var token = this.authService.getSessionToken();
var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
return this.http.delete<any>(`${environment.url_api}/Estudiantes-edit/?id=${idUser}`,{headers:headers});
}

//Obtener el total de cada uno de los usuarios del sistema
public getTotalUsuarios(){
var token = this.authService.getSessionToken();
var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
return this.http.get<any>(`${environment.url_api}/Estudiantes-edit/`, {headers:headers});
}
}
