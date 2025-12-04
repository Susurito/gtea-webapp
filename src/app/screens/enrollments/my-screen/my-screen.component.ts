import { Component, OnInit, Input } from '@angular/core';
import { combineLatest } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { EnrollmentCancelModalComponent } from '../../../modals/enrollment-cancel-modal/enrollment-cancel-modal.component';
import { SidebarComponent } from "../../../partials/sidebar/sidebar.component";


export interface EnrollmentsService {
  id: number; // <-- ¡Añadir ID!
  nombre: string;
  fecha: Date;
  horaInicio: string;
  horaFin: string;
  ubicacion: string;
  estado: 'Confirmado' | 'Pendiente' | 'Cancelado';
}

// Interfaz para los datos que recibe el modal de cancelación
export interface EnrollmentCancelModalData {
  id: number;
  rol: string;
  eventoNombre: string;
}

@Component({
  selector: 'app-my-screen',
  imports: [CommonModule,SidebarComponent],
  templateUrl: './my-screen.component.html',
  styleUrl: './my-screen.component.scss'
})
export class MyScreenComponent implements OnInit {

 @Input() proximosEventos: number = 0;
  @Input() eventosAsistidos: number = 0;
  @Input() tasaAsistencia: number = 0;
  @Input() historialInscripciones: EnrollmentsService[] = [];

  mostrarModal: boolean = false;
  inscripcionACancelar: EnrollmentsService | null = null;

  ngOnInit(): void {
  }
  constructor(
    public dialog: MatDialog
  ) {
  }

  public delete(idUser: number){
    const dialogRef = this.dialog.open(EnrollmentCancelModalComponent,{
      data: {id: idUser, rol: 'alumno'}, //Se pasan valores a través del componente
      height: '288px',
      width: '328px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.isDelete){
        console.log("Alumno eliminado");
        //Recargar página
        window.location.reload();
      }else{
        alert("Alumno no eliminado ");
        console.log("No se eliminó el admin");
      }
    });
  }




  cancelarInscripcion(): void {
    if (this.inscripcionACancelar) {
      // **Lógica de Cancelación Real (API call)**
      console.log(`✅ Cancelación CONFIRMADA para: ${this.inscripcionACancelar.nombre}`);

      // Ejemplo: Cambiar el estado localmente después de un éxito simulado
      // En una aplicación real, esto se manejaría al recibir una respuesta exitosa del servidor.
      this.inscripcionACancelar.estado = 'Cancelado';
    }
    this.mostrarModal = false;
    this.inscripcionACancelar = null;
  }


}
