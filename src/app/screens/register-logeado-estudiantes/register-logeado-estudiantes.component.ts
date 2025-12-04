import { Component } from '@angular/core';
import { SidebarComponent } from "../../partials/sidebar/sidebar.component";
import { RegistroEstudianteComponent } from "../../partials/registro-estudiante/registro-estudiante.component";

@Component({
  selector: 'app-register-logeado-estudiantes',
  imports: [SidebarComponent, RegistroEstudianteComponent],
  templateUrl: './register-logeado-estudiantes.component.html',
  styleUrl: './register-logeado-estudiantes.component.scss'
})
export class RegisterLogeadoEstudiantesComponent {


}
