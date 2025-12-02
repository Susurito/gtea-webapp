import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { FacadeService } from './facade.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
        private facadeService: FacadeService
  ) { }


  //Obtener lista de alumnos
  public obtenerListaUsuarios (): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.get<any>(`${environment.url_api}/lista-alumnos/`, {headers:headers});
  }

  public modificarRolUsuario(idUsuario: number, nuevoRol: string): Observable<any> {
      var token = this.facadeService.getSessionToken();
      var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
      return this.http.post<any>(`${environment.url_api}/usuarios/${idUsuario}/cambiar-rol/`,
        { rol: nuevoRol },
        { headers: headers }
      );
  }
}
