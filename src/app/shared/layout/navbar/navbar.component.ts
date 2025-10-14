import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NAV_INDEX, CATEGORY_LABELS } from '../../../page/obra/data/obra.registry';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  isOpen = signal(false);

  // ✓ NUEVO: periodos de Vida (label visible + slug para ?period=)
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
      slug,
      label: CATEGORY_LABELS[slug] ?? this.pretty(slug),
      path: `/obra/${slug}`,
    }));
  });

  // categorías de Archivo (3 fijas)
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
