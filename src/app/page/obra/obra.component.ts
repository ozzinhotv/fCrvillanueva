import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { HeroComponent } from '../../shared/layout/hero/hero.component';
import { TextBlockComponent } from './components/text-block/text-block.component';
import { GalleryComponent } from './components/gallery/gallery.component';

import { ObraData } from './interfaces/obra-data.interface';
import { DATA_LOADERS } from './data/registry';

@Component({
  selector: 'app-obra',
  standalone: true,
  imports: [CommonModule, HeroComponent, TextBlockComponent, GalleryComponent],
  templateUrl: './obra.component.html',
})
export class ObraComponent {
  private route = inject(ActivatedRoute);
  data = signal<ObraData | null>(null);

  constructor() {
    effect(() => {
      const cat = this.route.snapshot.paramMap.get('cat') ?? 'ciudad-universitaria';
      const work = this.route.snapshot.paramMap.get('work') ?? 'aula-magna';
      this.loadData(cat, work);
    });
  }

  private async loadData(cat: string, work: string) {
    const path = `./data/${cat}/${work}.data.ts`;
    const loader = DATA_LOADERS[path];

    if (!loader) {
      this.data.set({
        category: 'Obra no encontrada',
        work: `${cat}/${work}`,
        hero: {
          image: 'assets/img/hero/croquisCaoma-1.png',
          title: 'Obra',
          subtitle: 'No encontrada',
          overlayColor: 'bg-gray-600',
          pt: 'pt-24',
        },
        introHtml: `<p>No existe loader para <code>${path}</code>. Agrégalo en <code>data/registry.ts</code>.</p>`,
        galleries: [],
      });
      return;
    }

    const mod = await loader();
    const exportName = Object.keys(mod)[0]; // e.g., AULA_MAGNA_DATA
    this.data.set(mod[exportName] as ObraData);
  }
}
