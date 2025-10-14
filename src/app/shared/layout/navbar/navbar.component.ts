import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { NAV_INDEX, CATEGORY_LABELS } from '../../../page/obra/data/obra.registry';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  isOpen = signal(false);

  obraCategories = computed(() => {
    const cats = Object.keys(NAV_INDEX).sort();
    return cats.map(slug => ({
      slug,
      label: CATEGORY_LABELS[slug] ?? this.pretty(slug),
      path: `/obra/${slug}`,
    }));
  });

  // ✨ NUEVO: categorías de Archivo (con las 3 fijas)
  archivoCategories = [
    { key: 'articulo',     label: 'Artículos' },
    { key: 'escrito',      label: 'Escritos' },
    { key: 'conferencia',  label: 'Conferencias' },
  ] as const;

  toggle() { this.isOpen.update(v => !v); }
  close()  { this.isOpen.set(false); }

  private pretty(s: string) {
    return s.replace(/[-_]/g, ' ').replace(/\b\w/g, ch => ch.toUpperCase());
  }


}
