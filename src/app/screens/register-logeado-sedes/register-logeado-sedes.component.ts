import { Component } from '@angular/core';
import { RegistroSedesAulasComponent } from "../../partials/registro-sedes-aulas/registro-sedes-aulas.component";
import { SidebarComponent } from "../../partials/sidebar/sidebar.component";

@Component({
  selector: 'app-register-logeado-sedes',
  imports: [RegistroSedesAulasComponent, SidebarComponent],
  templateUrl: './register-logeado-sedes.component.html',
  styleUrl: './register-logeado-sedes.component.scss'
})
export class RegisterLogeadoSedesComponent {

}
