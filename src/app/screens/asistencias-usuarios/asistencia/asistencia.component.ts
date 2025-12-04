import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../../partials/sidebar/sidebar.component'; 


// Interfaz para representar un estudiante inscrito
export interface EstudianteInscrito {
  id: number;
  nombre: string;
  correo: string;
  fecha_inscripcion: Date;
  estado: 'Inscrito' | 'Cancelado';
  motivo_cancelacion: string | null;
  asistencia: 'Asistió' | 'No Asistió' | 'Pendiente';
  estudiante_id: number;
  evento_id: number;
  creation: Date;
  update: Date;
}

// Datos del evento para el encabezado
export interface EventoData {
  nombre: string;
  fecha: string;
  horario: string;
  inscritos: number;
  cupo: number;
  asistenciasMarcadas: number;
  totalEstudiantes: number;
}


@Component({
  selector: 'app-asistencia',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    FormsModule
  ],
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.scss']
})
export class AsistenciaComponent implements OnInit {

  // Datos simulados del evento
  evento: EventoData = {
    nombre: 'Workshop de React Avanzado',
    fecha: '15 de Octubre, 2025',
    horario: '14:00 - 17:00',
    inscritos: 30,
    cupo: 50,
    asistenciasMarcadas: 2,
    totalEstudiantes: 50
  };

  // Datos simulados de la tabla de estudiantes
  dataSource: EstudianteInscrito[] = [
    {
      id: 1,
      nombre: 'Juan Pérez González',
      correo: 'juan.perez@institucion.edu',
      fecha_inscripcion: new Date('2025-09-10'),
      estado: 'Inscrito',
      motivo_cancelacion: null,
      asistencia: 'Asistió',
      estudiante_id: 101,
      evento_id: 202,
      creation: new Date(),
      update: new Date(),
    },
    {
      id: 2,
      nombre: 'María García López',
      correo: 'maria.garcia@institucion.edu',
      fecha_inscripcion: new Date('2025-09-11'),
      estado: 'Inscrito',
      motivo_cancelacion: null,
      asistencia: 'Asistió',
      estudiante_id: 102,
      evento_id: 202,
      creation: new Date(),
      update: new Date(),
    },
    {
      id: 3,
      nombre: 'Carlos Ramírez',
      correo: 'carlos.ramirez@institucion.edu',
      fecha_inscripcion: new Date('2025-09-12'),
      estado: 'Inscrito',
      motivo_cancelacion: null,
      asistencia: 'No Asistió',
      estudiante_id: 103,
      evento_id: 202,
      creation: new Date(),
      update: new Date(),
    },
    {
      id: 4,
      nombre: 'Ana Martínez',
      correo: 'ana.martinez@institucion.edu',
      fecha_inscripcion: new Date('2025-09-13'),
      estado: 'Inscrito',
      motivo_cancelacion: null,
      asistencia: 'Pendiente',
      estudiante_id: 104,
      evento_id: 202,
      creation: new Date(),
      update: new Date(),
    }
  ];

  filtroBusqueda: string = '';

  constructor() { }

  ngOnInit(): void {
    this.actualizarContadorAsistencias();
  }

  // Lógica principal: Marcar asistencia al hacer clic en el botón
  marcarAsistencia(estudiante: EstudianteInscrito): void {
    // 1. Verificar si ya está marcada para evitar doble marca (opcional)
    if (estudiante.asistencia === 'Asistió') {
      console.log(`La asistencia de ${estudiante.nombre} ya está marcada.`);
      return;
    }

    // 2. Actualizar el estado de asistencia
    estudiante.asistencia = 'Asistió';

    // 3. (OPCIONAL pero recomendado) Llamar a un servicio para guardar el cambio en la base de datos
    // this.asistenciaService.guardarAsistencia(estudiante.id, estudiante.evento_id, 'Asistió').subscribe(...);

    // 4. Actualizar el contador del encabezado
    this.actualizarContadorAsistencias();

    console.log(`Asistencia de ${estudiante.nombre} marcada exitosamente.`);
  }

  // Función para actualizar el contador en el encabezado
  actualizarContadorAsistencias(): void {
    this.evento.asistenciasMarcadas = this.dataSource.filter(e => e.asistencia === 'Asistió').length;
  }

  // Lógica de filtrado de la tabla por nombre o correo
  get estudiantesFiltrados(): EstudianteInscrito[] {
    const filtro = this.filtroBusqueda.toLowerCase();
    if (!filtro) {
      return this.dataSource;
    }
    return this.dataSource.filter(est =>
      est.nombre.toLowerCase().includes(filtro) ||
      est.correo.toLowerCase().includes(filtro)
    );
  }
}
