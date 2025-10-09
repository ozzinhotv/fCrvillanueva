// src/app/shared/navbar/navbar.component.ts
import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NAV_INDEX, CATEGORY_LABELS } from '../../../page/obra/data/registry';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, SidebarComponent],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  isSidebarOpen = false;

  obraCategories = computed(() => {
    const cats = Object.keys(NAV_INDEX).sort();
    return cats.map((slug) => ({
      slug,
      label: CATEGORY_LABELS[slug] ?? this.pretty(slug),
      path: `/obra/${slug}`, // va a /obra/:cat (el redirect decide la obra)
    }));
  });

  toggleSidebar() { this.isSidebarOpen = !this.isSidebarOpen; }
  closeSidebar()  { this.isSidebarOpen = false; }

  private pretty(s: string) {
    return s.replace(/[-_]/g, ' ').replace(/\b\w/g, ch => ch.toUpperCase());
  }
}
