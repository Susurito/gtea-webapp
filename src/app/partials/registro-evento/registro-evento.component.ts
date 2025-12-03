import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
declare var $: any;

// Angular Material
// Angular Material (MDC moderno para Angular 19)
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';


import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { EventsService } from '../../services/events.service';
import { AdministradoresService } from '../../services/administradores.service';
import { OrganizadoresService } from '../../services/organizadores.service';

@Component({
  selector: 'app-registro-evento',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    NgxMaterialTimepickerModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaskDirective,
  ],
  providers: [provideNgxMask()],
  templateUrl: './registro-evento.component.html',
  styleUrl: './registro-evento.component.scss'
})
export class RegistroEventoComponent {
  @Input() datos_user: any = {};

  public tipo: string = "";
  public editar: boolean = false;
  public errors: any = {};
  public evento: any = {
    publico_json: []
  };
  public idEvento: number = 0;
  public esEstudiante: boolean = false;

  public responsable: any[] = [];
  public cate: any[] = [];

  //Para el select1
  public modo: any[] = [
    { value: '1', viewValue: 'Presencial' },
    { value: '2', viewValue: 'Virtual' },
    { value: '3', viewValue: 'Hibrido' },
  ];


  //Para el check
  public publico: any[] = [
    { value: '1', nombre: 'Estudiantes' },
    { value: '2', nombre: 'Publico en general' }
  ];


  constructor(
    private location: Location,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private eventsService: EventsService,
    private administradoresServices: AdministradoresService,
    private organizadoresService: OrganizadoresService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.cargarResponsables();
    this.evento = this.eventsService.esquemaEvento();
    //Imprimir datos en consola
    console.log("Evento: ", this.evento)

    // El if valida si existe un parámetro en la URL
    if (this.activatedRoute.snapshot.params['id'] !== undefined) {
      this.editar = true;
      // Asignamos a nuestra variable global el valor del ID que viene por la URL
      this.idEvento = this.activatedRoute.snapshot.params['id'];
      console.log("ID del evento: ", this.idEvento);

      // Llamamos al método que obtiene los datos del evento por su ID
      this.obtenerEventoPorID();
    }
  }


  public obtenerEventoPorID() {
    this.eventsService.getEventoByID(this.idEvento).subscribe(
      (response: any) => {
        console.log("Evento obtenido del backend:", response);

        // Convertir las horas a 12 horas con AM/PM para que el timepicker las entienda
        response.hora_inicio = this.convertirHora24a12(response.hora_inicio);
        response.hora_final = this.convertirHora24a12(response.hora_final);

        this.evento = response;

        console.log("Evento preparado para editar:", this.evento);
      },
      (error) => {
        console.error("Error al obtener el evento:", error);
      }
    );
  }

  public registrar(): void {
    //Validación del formulario
    this.errors = [];

    this.errors = this.eventsService.validarEvento(this.evento, this.editar);
    if (!$.isEmptyObject(this.errors)) {
      return; // solo return, no return false
    }

    this.eventsService.registrarEvento(this.evento).subscribe(
      (response) => {
        alert("Evento registrado correctamente");
        console.log("Evento registrado: ", response);
        this.router.navigate(["home"]);
      },
      (error) => {
        alert("No se pudo registrar el evento");
        console.error(error);
      }
    );
  }


  public actualizar() {
    /*const dialogRef = this.dialog.open(EditarEventoModalComponent, {
      data: this.evento, // Le mandas el evento a editar
      height: '288px',
      width: '328px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.isEdit) {
        alert("Evento editado correctamente");
        this.router.navigate(["home"]);
      } else {
        console.log("Edición cancelada");
      }
    });
    */
  }

  public cargarResponsables() {
    this.organizadoresService.obtenerListaOrganizador().subscribe(organizador => {
      this.administradoresServices.obtenerListaAdmins().subscribe(admins => {
        const organizadorMap = organizador.map((m: any) => ({
          id: m.id,
          nombre: `${m.user.first_name} ${m.user.last_name}`
        }));

        const adminsMap = admins.map((a: any) => ({
          id: a.id,
          nombre: `${a.user.first_name} ${a.user.last_name}`
        }));

        this.responsable = [...organizadorMap, ...adminsMap];
      });
    });
  }

  public regresar() {
    this.location.back();
  }

  /*
  public cargarResponsables() {
    this.organizadoresService.obtenerListaOrganizador().subscribe(organizador => {
      this.administradoresServices.obtenerListaAdmins().subscribe(admins => {
        const organizadorMap = organizador.map((m: any) => ({
          id: m.id,
          nombre: `${m.user.first_name} ${m.user.last_name}`
        }));

        const adminsMap = admins.map((a: any) => ({
          id: a.id,
          nombre: `${a.user.first_name} ${a.user.last_name}`
        }));

        this.responsable = [...organizadorMap, ...adminsMap];
      });
    });
  }
  */
  public convertirHora12a24(hora12: string): string {
    if (!hora12) return '';
    const [time, modifier] = hora12.split(' ');
    if (!time || !modifier) return hora12;
    let [hours, minutes] = time.split(':').map(Number);

    if (modifier.toUpperCase() === 'PM' && hours < 12) {
      hours += 12;
    }
    if (modifier.toUpperCase() === 'AM' && hours === 12) {
      hours = 0;
    }
    const horasStr = hours.toString().padStart(2, '0');
    const minutosStr = minutes.toString().padStart(2, '0');

    return `${horasStr}:${minutosStr}`;
  }

  public convertirHora24a12(hora24: string): string {
    if (!hora24) return '';
    let [hours, minutes] = hora24.split(':').map(Number);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // convierte 0 -> 12
    const horasStr = hours.toString().padStart(2, '0');
    const minutosStr = minutes.toString().padStart(2, '0');
    return `${horasStr}:${minutosStr} ${ampm}`;
  }

  public soloLetras(event: KeyboardEvent) {
    const charCode = event.key.charCodeAt(0);
    // Permitir solo letras (mayúsculas y minúsculas) y espacio
    if (
      !(charCode >= 65 && charCode <= 90) &&  // Letras mayúsculas
      !(charCode >= 97 && charCode <= 122) && // Letras minúsculas
      !(charCode >= 48 && charCode <= 57) &&  // Números
      charCode !== 32                         // Espacio
    ) {
      event.preventDefault();
    }
  }

  public signosBasicos(event: KeyboardEvent) {
    const char = event.key;

    // Expresión regular que permite:
    // Letras (a-z A-Z), números (0-9), espacio y signos de puntuación básicos
    const regex = /^[a-zA-Z0-9 .,;:!?¡¿'"()\-_/]*$/;

    if (!regex.test(char)) {
      event.preventDefault();
    }
  }

  //Función para detectar el cambio de fecha
  public changeFecha(event: any) {
    console.log(event);
    console.log(event.value.toISOString());

    this.evento.fecha_evento = event.value.toISOString().split("T")[0];
    console.log("Fecha: ", this.evento.fecha_evento);
  }

  //Función para detectar el cambio de hora
  public changeHoraInicio(event: any) {
    console.log("Hora inicio (12h):", event);
    // Convertir a formato 24h
    this.evento.hora_inicio = this.convertirHora12a24(event);
    console.log("Hora inicio guardada para enviar (24h):", this.evento.hora_inicio);
  }

  public changeHoraFinal(event: any) {
    console.log("Hora final (12h):", event);
    this.evento.hora_final = this.convertirHora12a24(event);
    console.log("Hora final guardada (24h):", this.evento.hora_final);
  }

  public checkboxChange(event: any) {
    console.log("Evento: ", event);

    // Garantizar que el array exista SIEMPRE
    if (!Array.isArray(this.evento.publico_json)) {
      this.evento.publico_json = [];
    }

    const valor = event.source.value;

    if (event.checked) {
      if (!this.evento.publico_json.includes(valor)) {
        this.evento.publico_json.push(valor);
      }
    } else {
      this.evento.publico_json = this.evento.publico_json.filter(
        (publico: string) => publico !== valor
      );
    }

    // Verificar si "Estudiantes" está seleccionado
    this.esEstudiante = this.evento.publico_json.includes("Estudiantes");

    console.log("Array público: ", this.evento.publico_json);
    console.log("¿Es estudiante?", this.esEstudiante);
  }



  public revisarSeleccion(nombre: string): boolean {
    if (this.evento.publico_json) {
      const busqueda = this.evento.publico_json.find((element: string) => element === nombre);
      return busqueda !== undefined;
    } else {
      return false;
    }
  }


}
