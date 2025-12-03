import { Component } from '@angular/core';
import { RegistroOrganizadorComponent } from "../../partials/registro-organizador/registro-organizador.component";
import { SidebarComponent } from "../../partials/sidebar/sidebar.component";

@Component({
  selector: 'app-register-logeado-organizador',
  imports: [RegistroOrganizadorComponent, SidebarComponent],
  templateUrl: './register-logeado-organizador.component.html',
  styleUrl: './register-logeado-organizador.component.scss'
})
export class RegisterLogeadoOrganizadorComponent {

}
