import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SidebarComponent } from "../../../partials/sidebar/sidebar.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FacadeService } from '../../../services/facade.service';
import { UsersService } from '../../../services/users.service';
import { ConfirmDeleteModalComponent } from '../../../modals/confirm-delete-modal/confirm-delete-modal.component';

// Define la interfaz de tus datos
interface User {
  id: number;
  nombre: string;
  correo: string;
  rol: 'Estudiante' | 'Organizador' | 'Administrador';
  registrado: string;
  eventos: number;
}


@Component({
  selector: 'app-users-screen',
  imports: [SidebarComponent, FormsModule, CommonModule],
  templateUrl: './users-screen.component.html',
  styleUrls: ['./users-screen.component.scss']
})
export class UsersScreenComponent implements OnInit{

  // Lista completa obtenida de la API. Esta NUNCA se modifica.
  public allUsers: User[] = [];
  // Lista que se utiliza para pintar la tabla (es la que se filtra).
  public users: User[] = [];

  // --- Propiedades Dinámicas de Estadística ---
  totalUsuarios: number = 0;
  estudiantes: number = 0;
  organizadores: number = 0;
  administradores: number = 0;

  // Variables para filtros (Necesarias para [(ngModel)])
  searchTerm: string = '';
  filterRole: string = '';

  constructor(
    public facadeService: FacadeService,
    public usersService: UsersService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // 1. Cargar los usuarios del backend al inicio
    this.obtenerUsuarios();
  }

  // --- LÓGICA DE DATOS ---

  public obtenerUsuarios(){
    this.usersService.obtenerListaUsuarios().subscribe(
      (response)=>{
        console.log("Respuesta de la API de Usuarios:", response);
        // Llama a la función de mapeo y conteo con la respuesta del API
        this.mapAndCountUsers(response);
        // Aplica el filtro inicial (muestra todos)
        this.applyFilter();
      }, (error)=>{
        console.error("Error al obtener la lista de usuarios:", error);
        alert("No se pudo obtener la lista de usuarios. Revisa el backend y el token de sesión.");
      }
    );
  }

  /**
   * Mapea los datos del backend al formato User[] y calcula las estadísticas.
   * @param rawUsers Lista de usuarios recibida de la API.
   */
  private mapAndCountUsers(rawUsers: any[]): void {
    // Resetear contadores
    this.totalUsuarios = 0;
    this.estudiantes = 0;
    this.organizadores = 0;
    this.administradores = 0;

    // Mapear los datos, asumiendo que tu backend devuelve la estructura correcta.
    this.allUsers = rawUsers.map(usuario => {

      // Asigna el rol (o un valor por defecto si no existe)
      const rolMapeado = usuario.rol || 'Estudiante';

      // Conteo de estadísticas
      if (rolMapeado === 'Estudiante') { this.estudiantes++; }
      else if (rolMapeado === 'Organizador') { this.organizadores++; }
      else if (rolMapeado === 'Administrador') { this.administradores++; }

      // Formatear la fecha (si viene en formato ISO del backend)
      const fechaRegistro = new Date(usuario.fecha_registro).toLocaleDateString('es-ES', {
        year: 'numeric', month: 'short', day: 'numeric'
      });

      return {
        id: usuario.id,
        // Asegúrate de que los campos 'first_name', 'last_name', 'email' existan en 'usuario.user'
        nombre: `${usuario.user.first_name || ''} ${usuario.user.last_name || ''}`,
        correo: usuario.user.email || 'N/A',
        rol: rolMapeado as User['rol'],
        registrado: fechaRegistro,
        eventos: usuario.eventos_registrados || 0, // Asume un campo de conteo en el backend
      } as User;
    });

    this.totalUsuarios = this.allUsers.length;
  }

  /**
   * Aplica los filtros de búsqueda y rol sobre la lista completa (allUsers).
   * Esta función se llama en el (ngModelChange) del input y select.
   */
  applyFilter(): void {
    let filteredList = this.allUsers; // Siempre empezamos desde la lista original

    // 1. Filtrar por término de búsqueda (nombre o correo)
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filteredList = filteredList.filter(user =>
        user.nombre.toLowerCase().includes(term) ||
        user.correo.toLowerCase().includes(term)
      );
    }

    if (this.filterRole && this.filterRole !== '') {
      filteredList = filteredList.filter(user =>
        user.rol === this.filterRole
      );
    }

    this.users = filteredList;
    console.log(`Filtro aplicado: ${this.users.length} usuarios encontrados.`);
  }


  getRoleClass(rol: string): string {
    switch (rol) {
        case 'Estudiante': return 'role-estudiante';
        case 'Organizador': return 'role-organizador';
        case 'Administrador': return 'role-administrador';
        default: return '';
    }
  }

  modifyRole(user: User): void {
    alert(`Modificar rol para ${user.nombre}. Implementar modal/navegación aquí.`);
  }

  public delete(idUser: number){
  }
  public goEditar(idUser: number){
  }
}
