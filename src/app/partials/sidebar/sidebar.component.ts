import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { FacadeService } from '../../services/facade.service';
import { ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None

})


export class SidebarComponent implements OnInit {

  public isSidebarOpen: boolean = false;

  @Input() rol: string = "";

  // Enumeración simple de roles usados en plantillas
  ROLES = {
    ADMINISTRADOR: 'administrador',
    ORGANIZADOR: 'organizador',
    ESTUDIANTE: 'estudiante',

  } as const;

  userRole: string = '';

  constructor(
    private authService: AuthService,
    private facadeService: FacadeService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    // Leer rol desde el facade (lee la cookie o estado)
    this.rol = this.facadeService.getUserGroup() || '';
    this.userRole = this.rol;
    console.log('Rol user: ', this.rol);
    // Escuchar eventos globales para sincronizar estado del menú (desde Navbar)
    window.addEventListener('gtea:menu-toggle', this.onGlobalMenuToggle as EventListener);
  }

  // Listener para el custom event que envía el Navbar
  private onGlobalMenuToggle = (event: Event) => {
    try {
      const detail: any = (event as CustomEvent).detail || {};
      const open = !!detail.open;
      this.isSidebarOpen = open;
      const layout = document.querySelector('.gtea-layout');
      if (layout) {
        layout.classList.toggle('menu-open', open);
      }
    } catch (e) {
      // ignore
    }
  }

  // Método para pruebas: cambiar rol en tiempo de ejecución
  setRole(role: string) {
    this.facadeService.setUserGroup(role);
    this.rol = role;
    this.userRole = role;
    console.log('Rol seteado a:', role);
  }

  hasRole(role: string): boolean {
    return this.rol === role;
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
    const layout = document.querySelector('.gtea-layout');
    if (layout) {
      layout.classList.toggle('menu-open', this.isSidebarOpen);
    }
  }

  closeSidebarFromOverlay(): void {
    this.isSidebarOpen = false;
    const layout = document.querySelector('.gtea-layout');
    if (layout) {
      layout.classList.remove('menu-open');
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('gtea:menu-toggle', this.onGlobalMenuToggle as EventListener);
  }

   public goUsuarios(): void {
    this.router.navigate(['/usuarios']);
  }

  public goEventosAdmin(): void {
    this.router.navigate(['/eventos-admin']);
  }

  public goCategorias(): void {
    this.router.navigate(['/categorias']);
  }

   public goMisInscripciones(): void {
    this.router.navigate(['/mis-inscripciones']);
  }

  public goDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  public goVerEventos(): void {
    this.router.navigate(['/ver-eventos']);
  }
  public goSedes(): void {
    this.router.navigate(['/sedes']);
  }
  public goReportes(): void {
    this.router.navigate(['/reportes']);
  }

  public goEventos(): void {
    this.router.navigate(['/eventos']);
  }
  }
