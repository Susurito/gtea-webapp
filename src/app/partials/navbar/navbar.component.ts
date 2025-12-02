import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isMobileView = false;
  mobileOpen = false;

  ngOnInit() {
    const mq = window.matchMedia('(max-width: 768px)');
    const handler = () => this.isMobileView = mq.matches;
    handler();
    mq.addEventListener('change', handler);
  }

  toggleSidebar() {
    this.mobileOpen = !this.mobileOpen;
    // toggle class on the main layout so sidebar SCSS reacts
    const layout = document.querySelector('.gtea-layout');
    if (layout) {
      layout.classList.toggle('menu-open', this.mobileOpen);
    }
    // notify other components (Sidebar) about the change
    try { window.dispatchEvent(new CustomEvent('gtea:menu-toggle', { detail: { open: this.mobileOpen } })); } catch (e) { }
  }

  closeSidebar() {
    this.mobileOpen = false;
    const layout = document.querySelector('.gtea-layout');
    if (layout) {
      layout.classList.remove('menu-open');
    }
    try { window.dispatchEvent(new CustomEvent('gtea:menu-toggle', { detail: { open: false } })); } catch (e) { }
  }
  togglePalette() { /* tema */ }
}
