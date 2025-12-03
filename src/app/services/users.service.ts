import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { FacadeService } from './facade.service';
import { AuthService } from './auth.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
    private facadeService: FacadeService,
    private authService: AuthService
  ) { }


  //Obtener lista de alumnos
  public obtenerListaUsuarios(): Observable<any> {
    var token = this.authService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return this.http.get<any>(`${environment.url_api}/lista-alumnos/`, { headers: headers });
  }
  //Obtener lista de admins
  public obtenerListaAdmins(): Observable<any> {
    var token = this.authService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return this.http.get<any>(`${environment.url_api}/lista-admins/`, { headers: headers });
  }

  //Obtener lista organizador
  public obtenerListaOrganizador(): Observable<any> {
    var token = this.authService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return this.http.get<any>(`${environment.url_api}/lista-Organizador/`, { headers: headers });
  }

    //Obtener lista estudiantes
  public obtenerListaEstudiantes(): Observable<any> {
    var token = this.authService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return this.http.get<any>(`${environment.url_api}/lista-Estudiantes/`, { headers: headers });
  }

  public modificarRolUsuario(idUsuario: number, nuevoRol: string): Observable<any> {
    var token = this.authService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return this.http.post<any>(`${environment.url_api}/usuarios/${idUsuario}/cambiar-rol/`,
      { rol: nuevoRol },
      { headers: headers }
    );
  }

  //Servicio para obtener Totales de Usuarios
  public obtenerTotalesUsuarios(data?: any): Observable<any> {
    const token = this.authService.getSessionToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.http.get<any>(`${environment.url_api}/admins-edit/`, { headers });
  }

}
