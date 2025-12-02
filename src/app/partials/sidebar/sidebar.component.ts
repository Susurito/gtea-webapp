import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
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

  ROLES = {
    ADMINISTRADOR: 'administrador',
    ORGANIZADOR: 'organizador',
    ESTUDIANTE: 'estudiante',
  } as const;

  constructor(
    private facadeService: FacadeService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Normalizar el rol
    this.rol = (this.facadeService.getUserGroup() || '').toLowerCase().trim();
    console.log('Rol user normalizado:', this.rol);

    window.addEventListener('gtea:menu-toggle', this.onGlobalMenuToggle as EventListener);
  }

  ngOnDestroy(): void {
    window.removeEventListener('gtea:menu-toggle', this.onGlobalMenuToggle as EventListener);
  }

  private onGlobalMenuToggle = (event: Event) => {
    try {
      const detail: any = (event as CustomEvent).detail || {};
      const open = !!detail.open;

      this.isSidebarOpen = open;

      const layout = document.querySelector('.gtea-layout');
      if (layout) layout.classList.toggle('menu-open', open);

    } catch {}
  }

  // Validar rol correcto
  hasRole(role: string): boolean {
    return this.rol.toLowerCase() === role.toLowerCase();
  }
}
