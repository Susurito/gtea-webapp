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
export class EnrollmentsService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private errorsService: ErrorsService,
    private validatorService: ValidatorService
  ) { }

  //Eliminar inscripcion
  public eliminarInscripcion(idUser: number): Observable<any> {
    var token = this.authService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return this.http.delete<any>(`${environment.url_api}/eventos-edit/?id=${idUser}`, { headers: headers });
  }
}
