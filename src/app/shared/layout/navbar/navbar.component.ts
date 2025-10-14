import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarState } from './navbar.state';

import { NAV_INDEX, CATEGORY_LABELS } from '../../../pages/obra/data/obra.registry';
import { NavbarLogoComponent } from './navbar-logo/navbar-logo.component';
import { NavbarLinksDesktopComponent } from './navbar-links-desktop/navbar-links-desktop.component';
import { NavbarPanelDesktopComponent } from './navbar-panel-desktop/navbar-panel-desktop.component';
import { NavbarToggleComponent } from './navbar-toggle/navbar-toggle.component';
import { NavbarOverlayMobileComponent } from './navbar-overlay-mobile/navbar-overlay-mobile.component';
import { NavbarSidebarMobileComponent } from './navbar-sidebar-mobile/navbar-sidebar-mobile.component';

@Component({
  selector: 'app-navbar',
  providers: [NavbarState],
  imports: [
    CommonModule,
    NavbarLogoComponent,
    NavbarLinksDesktopComponent,
    NavbarPanelDesktopComponent,
    NavbarToggleComponent,
    NavbarOverlayMobileComponent,
    NavbarSidebarMobileComponent
  ],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  vidaPeriods = [
    { label: '1900–1928', slug: '1900-1928' },
    { label: '1929–1940', slug: '1929-1940' },
    { label: '1941–1949', slug: '1941-1949' },
    { label: '1950–1958', slug: '1950-1958' },
    { label: '1959–1969', slug: '1959-1969' },
    { label: '1970–1975', slug: '1970-1975' },
  ] as const;

  obraCategories = computed(() => {
    const cats = Object.keys(NAV_INDEX).sort();
    return cats.map(slug => ({
      label: CATEGORY_LABELS[slug] ?? this.pretty(slug),
      path: `/obra/${slug}`,
    }));
  });

  archivoCategories = [
    { label: 'Artículos',    path: ['/archivo'], queryParams: { cat: 'articulo' } },
    { label: 'Escritos',     path: ['/archivo'], queryParams: { cat: 'escrito' } },
    { label: 'Conferencias', path: ['/archivo'], queryParams: { cat: 'conferencia' } },
  ] as const;

  private columnsComputed = computed(() => [
    { title: 'Vida',    items: this.vidaPeriods.map(p => ({ label: p.label, path: ['/vida'], queryParams: { period: p.slug } })) },
    { title: 'Obra',    items: this.obraCategories() },
    { title: 'Archivo', items: this.archivoCategories as any },
  ]);

  getColumns() { return this.columnsComputed(); }

  private pretty(s: string) {
    return s.replace(/[-_]/g, ' ').replace(/\b\w/g, ch => ch.toUpperCase());
  }
}
