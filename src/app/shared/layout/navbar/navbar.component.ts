import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive, SidebarComponent],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  isSidebarOpen = false;

  toggleSidebar() { this.isSidebarOpen = !this.isSidebarOpen; }
  closeSidebar()  { this.isSidebarOpen = false; }
}
