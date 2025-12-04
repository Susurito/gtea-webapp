import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SidebarComponent } from "../../../partials/sidebar/sidebar.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../services/users.service';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmDeleteModalComponent } from '../../../modals/confirm-delete-modal/confirm-delete-modal.component';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';


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
  imports: [SidebarComponent, FormsModule, CommonModule, MatIconModule, MatTableModule, MatButtonModule],
  templateUrl: './users-screen.component.html',
  styleUrls: ['./users-screen.component.scss']
})
export class UsersScreenComponent implements OnInit {

  public allUsers: User[] = [];
  public users: User[] = [];

  usuarios: User[] = [];
  // Totales obtenidos directamente del backend
  totalUsuarios: number = 0;
  estudiantes: number = 0;
  organizadores: number = 0;
  administradores: number = 0;

  searchTerm: string = '';
  filterRole: string = '';

  constructor(
    public usersService: UsersService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
    this.obtenerTotalesUsuarios();
  }

  public obtenerUsuarios() {
    this.usersService.obtenerListaEstudiantes().subscribe(estudiantes => {
      this.usersService.obtenerListaOrganizador().subscribe(organizadores => {
        this.usersService.obtenerListaAdmins().subscribe(admins => {

          // Mapear estudiantes
          const estudiantesMap = estudiantes.map((s: any) => ({
            id: s.id,
            nombre: `${s.user.first_name || ''} ${s.user.last_name || ''}`,
            correo: s.user.email || 'N/A',
            rol: 'Estudiante' as User['rol'],
            registrado: new Date(s.creation).toLocaleDateString('es-ES'),
            eventos: s.eventos_registrados || 0
          }));

          // Mapear organizadores
          const organizadoresMap = organizadores.map((o: any) => ({
            id: o.id,
            nombre: `${o.user.first_name || ''} ${o.user.last_name || ''}`,
            correo: o.user.email || 'N/A',
            rol: 'Organizador' as User['rol'],
            registrado: new Date(o.creation).toLocaleDateString('es-ES'),
            eventos: o.eventos_registrados || 0
          }));

          // Mapear administradores
          const adminsMap = admins.map((a: any) => ({
            id: a.id,
            nombre: `${a.user.first_name || ''} ${a.user.last_name || ''}`,
            correo: a.user.email || 'N/A',
            rol: 'Administrador' as User['rol'],
            registrado: new Date(a.creation).toLocaleDateString('es-ES'),
            eventos: a.eventos_registrados || 0
          }));


          // Unir todos
          this.allUsers = [...estudiantesMap, ...organizadoresMap, ...adminsMap];

          // Totales
          this.estudiantes = estudiantesMap.length;
          this.organizadores = organizadoresMap.length;
          this.administradores = adminsMap.length;
          this.totalUsuarios = this.allUsers.length;

          // Aplicar filtros
          this.applyFilter();
        });
      });
    });
  }


  // --- Totales de usuarios ---
  public obtenerTotalesUsuarios() {
    this.usersService.obtenerTotalesUsuarios().subscribe(
      (response: any) => {
        this.administradores = response.Administradores || 0;
        this.organizadores = response.Organizador || 0;
        this.estudiantes = response.Estudiantes || 0;
        this.totalUsuarios = response["Total usuarios"] || 0;
      },
      (error) => console.error("Error al obtener totales:", error)
    );

  }

  // --- Filtro de tabla ---
  applyFilter(): void {
    let filteredList = this.allUsers;

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filteredList = filteredList.filter(user =>
        user.nombre.toLowerCase().includes(term) ||
        user.correo.toLowerCase().includes(term)
      );
    }

    if (this.filterRole && this.filterRole !== '') {
      filteredList = filteredList.filter(user => user.rol === this.filterRole);
    }

    this.users = filteredList;
  }

  getRoleClass(rol: string): string {
    switch (rol) {
      case 'Estudiante': return 'role-estudiante';
      case 'Organizador': return 'role-organizador';
      case 'Administrador': return 'role-administrador';
      default: return '';
    }
  }

  public editarUsuario(user: any) {
    if (user.rol === 'Estudiante') {
      this.router.navigate(['register-logeado-estudiante', user.id]);
    } else if (user.rol === 'Organizador') {
      this.router.navigate(['register-logeado-organizador', user.id]);
    } else {
      alert('No se puede editar este tipo de usuario');
    }
  }

  public eliminarUsuario(userId: number) {
    // Lógica para eliminar usuario
    console.log('Eliminar usuario con ID:', userId);
  }

}

