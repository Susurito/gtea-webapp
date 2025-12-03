import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ErrorsService } from './tools/errors.service';
import { ValidatorService } from './tools/validator.service';
import { AuthService } from './auth.service';
import { FacadeService } from './facade.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AdministradoresService {

  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
    private authService: AuthService,
    private facadeService: FacadeService
  ) { }

  public esquemaAdmin(){
    return {
      'rol':'',
      'first_name': '',
      'last_name': '',
      'email': '',
      'password': '',
      'confirm_password': ''
    }
  }



  //Validación para el formulario administrador
  public validarAdmin(data: any, editar: boolean){
    console.log("Validando admin... ", data);

    let error: any = [];

    if(!this.validatorService.required(data["first_name"])){
      error["first_name"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["last_name"])){
      error["last_name"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["email"])){
      error["email"] = this.errorService.required;
    }else if(!this.validatorService.max(data["email"], 40)){
      error["email"] = this.errorService.max(40);
    }else if (!this.validatorService.email(data['email'])) {
      error['email'] = this.errorService.email;
    }

    if(!editar){
      if(!this.validatorService.required(data["password"])){
        error["password"] = this.errorService.required;
      }

      if(!this.validatorService.required(data["confirm_password"])){
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

  public obtenerListaAdmins(): Observable <any>{
    var token = this.authService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.get<any>(`${environment.url_api}/lista-admins/`, {headers:headers});
  }



  /*
  //Aquí van los servicios HTTP
  //Servicio para registrar un nuevo usuario
  public registrarAdmin (data: any): Observable <any>{
    return this.http.post<any>(`${environment.url_api}/admin/`,data, httpOptions);
  }

  //Obtener lista admins
  public obtenerListaAdmins (): Observable <any>{
    var token = this.authService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.get<any>(`${environment.url_api}/lista-admins/`, {headers:headers});
  }


  //Obtener un solo usuario dependiendo su ID
  public getAdminByID(idUser: Number){
    return this.http.get<any>(`${environment.url_api}/admin/?id=${idUser}`,httpOptions);
  }

  //Servicio para actualizar un usuario
  public editarAdmin (data: any): Observable <any>{
    var token = this.authService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.put<any>(`${environment.url_api}/admins-edit/`, data, {headers:headers});
  }
  //Eliminar Admin
  public eliminarAdmin(idUser: number): Observable <any>{
    var token = this.authService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.delete<any>(`${environment.url_api}/admins-edit/?id=${idUser}`,{headers:headers});
  }

  //Obtener el total de cada uno de los usuarios del sistema
  public getTotalUsuarios(){
    var token = this.authService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.get<any>(`${environment.url_api}/admins-edit/`, {headers:headers});
  }
    */
}
