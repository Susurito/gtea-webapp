import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';


const user_complete_name_cookie_name = 'sistema-escolar-user_complete_name';
const session_cookie_name = 'sistema-escolar-token';


@Injectable({
  providedIn: 'root'
})
export class FacadeService {

  private roleSubject: BehaviorSubject<string>;
  public role$;

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
  ) {
    const initialRole = this.authService.getUserGroup() || '';
    this.roleSubject = new BehaviorSubject<string>(initialRole);
    this.role$ = this.roleSubject.asObservable();
  }

  getUserGroup(): string {
    return this.authService.getUserGroup();
  }

  setUserGroup(role: string) {
    this.roleSubject.next(role);
    this.authService.saveCookieValue('gtea-group_name', role);
  }


  getUserCompleteName(){
    return this.cookieService.get(user_complete_name_cookie_name);
  }

  getSessionToken(){
    return this.cookieService.get(session_cookie_name);
  }
}
