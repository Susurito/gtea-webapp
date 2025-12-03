import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ErrorsService } from './tools/errors.service';
import { ValidatorService } from './tools/validator.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrganizadoresService {

  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
    private authService: AuthService
  ) { }

  public esquemaOrganizador() {
    return {
      'rol': '',
      'first_name': '',
      'last_name': '',
      'email': '',
      'password': '',
      'confirm_password': ''
    };
  }

  public validarOrganizador(data: any, editar: boolean) {
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

    if (!data["terms"]) {
      error["terms"] = this.errorService.terms;
    }

    return error;
  }

  // Método privado para headers con token
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getSessionToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // Servicios HTTP

  public registrarOrganizador(data: any): Observable<any> {
    return this.http.post<any>(`${environment.url_api}/Organizador/`, data, { headers: this.getAuthHeaders() });
  }

  public obtenerListaOrganizador(): Observable<any> {
    return this.http.get<any>(`${environment.url_api}/lista-Organizador/`, { headers: this.getAuthHeaders() });
  }

  public getAdminByID(idUser: number): Observable<any> {
    return this.http.get<any>(`${environment.url_api}/Organizador/?id=${idUser}`, { headers: this.getAuthHeaders() });
  }

  public editarOrganizador(data: any): Observable<any> {
    return this.http.put<any>(`${environment.url_api}/Organizador-edit/`, data, { headers: this.getAuthHeaders() });
  }

  public eliminarOrganizador(idUser: number): Observable<any> {
    return this.http.delete<any>(`${environment.url_api}/Organizador-edit/?id=${idUser}`, { headers: this.getAuthHeaders() });
  }

}
