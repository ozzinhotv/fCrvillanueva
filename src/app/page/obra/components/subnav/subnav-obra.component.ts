import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { NAV_INDEX, DATA_LOADERS, CATEGORY_LABELS } from '../../data/registry';
import { ObraData } from '../../interfaces/obra-data.interface';

type WorkEntry = { slug: string; title: string };

@Component({
  selector: 'subnav-obra',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './subnav-obra.component.html',
})
export class SubnavObraComponent {
  private route = inject(ActivatedRoute);

  isOpen = signal(false); // solo para móvil

  cat = signal('');
  work = signal('');
  works = signal<WorkEntry[]>([]);

  slugs = computed(() => NAV_INDEX[this.cat()] ?? []);

  categoryLabel = computed(() => CATEGORY_LABELS[this.cat()] ?? this.pretty(this.cat()));
  currentWorkLabel = computed(() => {
    const found = this.works().find(w => w.slug === this.work());
    return found?.title ?? this.pretty(this.work());
  });

  constructor() {
    this.route.paramMap.subscribe(async pm => {
      const c = pm.get('cat') ?? '';
      const w = pm.get('work') ?? '';
      const catChanged = c !== this.cat();

      this.cat.set(c);
      this.work.set(w);
      this.isOpen.set(false); // plegado por defecto en móvil

      if (catChanged) await this.loadTitlesForCategory(c);
    });
  }

  toggle() { this.isOpen.update(v => !v); }

  private async loadTitlesForCategory(cat: string) {
    const slugs = NAV_INDEX[cat] ?? [];
    const entries = await Promise.all(slugs.map(async (slug) => {
      const path = `./data/${cat}/${slug}.data.ts`;
      const loader = DATA_LOADERS[path];
      if (!loader) return { slug, title: this.pretty(slug) };
      try {
        const mod = await loader();
        const exportName = Object.keys(mod)[0];
        const data = mod[exportName] as ObraData;
        return { slug, title: data?.work ?? this.pretty(slug) };
      } catch {
        return { slug, title: this.pretty(slug) };
      }
    }));
    this.works.set(entries);
  }

  private pretty(s: string) {
    return s.replace(/[-_]/g, ' ').replace(/\b\w/g, ch => ch.toUpperCase());
  }
}
