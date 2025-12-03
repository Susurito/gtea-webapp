import { Component } from '@angular/core';
import { RegistroCategoriasComponent } from "../../partials/registro-categorias/registro-categorias.component";
import { SidebarComponent } from "../../partials/sidebar/sidebar.component";

@Component({
  selector: 'app-register-logeado-categorias',
  imports: [RegistroCategoriasComponent, SidebarComponent],
  templateUrl: './register-logeado-categorias.component.html',
  styleUrl: './register-logeado-categorias.component.scss'
})
export class RegisterLogeadoCategoriasComponent {

}
