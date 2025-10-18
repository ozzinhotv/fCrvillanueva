import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { HeroComponent } from '../../shared/layout/hero/hero.component';
import { TextBlockComponent } from './components/text-block/text-block.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { SubnavObraComponent } from './components/subnav/subnav-obra.component';

import { ObraData } from './interfaces/obra-data.interface';
import { ObraDataService } from './service/obra-data.service';
import { GalleryLightboxComponent } from './components/gallery/ui/gallery-lightbox/gallery-lightbox.component';
import { LightboxService } from './service/lightbox.service';

@Component({
  selector: 'app-obra',
  standalone: true,
  imports: [CommonModule, HeroComponent, TextBlockComponent, GalleryComponent, SubnavObraComponent, GalleryLightboxComponent],
  templateUrl: './obra.component.html',
})
export class ObraComponent {
  private route = inject(ActivatedRoute);
  private obraSvc = inject(ObraDataService);
  lb = inject(LightboxService);

  data = signal<ObraData | null>(null);

  constructor() {
    this.route.paramMap.subscribe(pm => {
      const cat  = pm.get('cat')  ?? 'ciudad-universitaria';
      const work = pm.get('work') ?? 'aula-magna';
      this.loadData(cat, work);
    });
  }

  private loadData(cat: string, work: string) {
    const t0 = performance.now();
    this.obraSvc.getObra(cat, work).subscribe(res => {
      if (res) { this.data.set(res); return; }
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
        introHtml: `<p>No existe JSON en <code>/assets/data/obra/${cat}/${work}.json</code>.</p>`,
        galleries: [],
      });
    });
  }

  onLbVisibleChange(v: boolean) { if (!v) this.lb.close(); }

}
