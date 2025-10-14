import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { NAV_INDEX, CATEGORY_LABELS, TITLES } from '../../data/obra.registry';

type WorkEntry = { slug: string; title: string };

@Component({
  selector: 'subnav-obra',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './subnav-obra.component.html',
})
export class SubnavObraComponent {
  private route = inject(ActivatedRoute);

  isOpen = signal(false);
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
    this.route.paramMap.subscribe(pm => {
      const c = pm.get('cat') ?? '';
      const w = pm.get('work') ?? '';
      const catChanged = c !== this.cat();

      this.cat.set(c);
      this.work.set(w);
      this.isOpen.set(false);

      if (catChanged) this.loadTitlesForCategory(c);
    });
  }

  toggle() { this.isOpen.update(v => !v); }

  private loadTitlesForCategory(cat: string) {
    const slugs = NAV_INDEX[cat] ?? [];
    const entries: WorkEntry[] = slugs.map(slug => ({
      slug,
      title: TITLES[slug] ?? this.pretty(slug),
    }));
    this.works.set(entries);
  }

  private pretty(s: string) {
    return s.replace(/[-_]/g, ' ').replace(/\b\w/g, ch => ch.toUpperCase());
  }
}
