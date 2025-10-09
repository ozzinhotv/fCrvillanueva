import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroComponent } from '../../shared/layout/hero/hero.component';
import { TextBlockComponent } from './components/text-block/text-block.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ObraData } from './interfaces/obra-data.interface';
import { DATA_LOADERS } from './data/registry';
import { SubnavObraComponent } from './components/subnav/subnav-obra.component';

@Component({
  selector: 'app-obra',
  imports: [CommonModule, HeroComponent, TextBlockComponent, GalleryComponent, SubnavObraComponent],
  templateUrl: './obra.component.html',
})
export class ObraComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  data = signal<ObraData | null>(null);

  constructor() {
    this.route.paramMap.subscribe(pm => {
      const cat = pm.get('cat') ?? 'ciudad-universitaria';
      const work = pm.get('work') ?? 'aula-magna';
      this.loadData(cat, work);
    });
  }

  private async loadData(cat: string, work: string) {
    const path = `./data/${cat}/${work}.data.ts`;
    const loader = DATA_LOADERS[path];

    if (!loader) {
      // si prefieres volver al landing:
      // this.router.navigateByUrl('/obra', { replaceUrl: true }); return;
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
    const exportName = Object.keys(mod)[0];
    this.data.set(mod[exportName] as ObraData);
  }
}
