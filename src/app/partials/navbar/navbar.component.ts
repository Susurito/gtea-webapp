import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
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

  toggleSidebar() { this.mobileOpen = !this.mobileOpen; }
  closeSidebar() { this.mobileOpen = false; }
  togglePalette() { /* tema */ }
}
