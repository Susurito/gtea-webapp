import { Component, Input } from '@angular/core';

import { SidebarComponent } from "../../partials/sidebar/sidebar.component";

declare var $: any;

// Angular Material
// Angular Material (MDC moderno para Angular 19)
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';


import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { EventsService } from '../../services/events.service';
import { RegistroEventoComponent } from "../../partials/registro-evento/registro-evento.component";

@Component({
  selector: 'app-register-logeado',
  imports: [
    SidebarComponent,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    RegistroEventoComponent
],
  templateUrl: './register-logeado.component.html',
  styleUrl: './register-logeado.component.scss'
})
export class RegisterLogeadoComponent {

}
