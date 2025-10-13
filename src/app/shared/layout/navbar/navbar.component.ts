import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { NAV_INDEX, CATEGORY_LABELS } from '../../../page/obra/data/registry';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  isOpen = signal(false);

  constructor(private router: Router) {}

  obraCategories = computed(() => {
    const cats = Object.keys(NAV_INDEX).sort();
    return cats.map(slug => ({
      slug,
      label: CATEGORY_LABELS[slug] ?? this.pretty(slug),
      path: `/obra/${slug}`,
    }));
  });

  archivoCategories = [
    { key: 'articulo', label: 'Artículos' },
    { key: 'escrito', label: 'Escritos' },
    { key: 'conferencia', label: 'Conferencias' },
  ] as const;

  isSectionActive(section: 'obra'|'archivo'|'vida'): boolean {
    const url = this.router.url;
    switch (section) {
      case 'obra':     return url.startsWith('/obra');
      case 'archivo':  return url.startsWith('/archivo');
      case 'vida':     return url.startsWith('/vida');
    }
  }

  toggle() { this.isOpen.update(v => !v); }
  close()  { this.isOpen.set(false); }

  private pretty(s: string) {
    return s.replace(/[-_]/g, ' ').replace(/\b\w/g, ch => ch.toUpperCase());
  }
}
