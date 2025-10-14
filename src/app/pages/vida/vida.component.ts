import { Component, inject, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { TimelineComponent } from './components/timeline/timeline.component';
import { HeroComponent } from '../../shared/layout/hero/hero.component';
import { TimelineGroup } from './interfaces/timeline-group.interface';
import { VidaDataService } from './services/vida-data.service';
import { VidaCardInterface } from './interfaces/vida-card.interface';

@Component({
  selector: 'app-vida',
  standalone: true,
  imports: [CommonModule, HttpClientModule, TimelineComponent, HeroComponent],
  templateUrl: './vida.component.html',
})
export class VidaComponent {
  private data = inject(VidaDataService);
  private route = inject(ActivatedRoute);
  private zone = inject(NgZone);

  cards: VidaCardInterface[] = [];
  groups: TimelineGroup[] = [];

  constructor() {
    this.data.getCards().subscribe(cards => {
      this.cards = cards;

      this.groups = [
        { label: '1900–1928', bgClass: 'bg-neutral-50', items: this.cards.filter(c => this.inRange(c.year, 1900, 1928)) },
        { label: '1929–1940', bgClass: 'bg-white',      items: this.cards.filter(c => this.inRange(c.year, 1929, 1940)) },
        { label: '1941–1949', bgClass: 'bg-neutral-50', items: this.cards.filter(c => this.inRange(c.year, 1941, 1949)) },
        { label: '1950–1958', bgClass: 'bg-white',      items: this.cards.filter(c => this.inRange(c.year, 1950, 1958)) },
        { label: '1959–1969', bgClass: 'bg-neutral-50', items: this.cards.filter(c => this.inRange(c.year, 1959, 1969)) },
        { label: '1970–1975', bgClass: 'bg-white',      items: this.cards.filter(c => this.inRange(c.year, 1970, 1975)) },
      ];

      // 1) Scroll inicial si ya viene ?period= en la URL
      const initial = this.route.snapshot.queryParamMap.get('period');
      if (initial) this.scrollToPeriod(initial);

      // 2) Responder a cambios posteriores del query param estando en /vida
      this.route.queryParamMap.subscribe(map => {
        const p = map.get('period');
        if (p) this.scrollToPeriod(p);
      });
    });
  }

  private inRange(year: string, from: number, to: number): boolean {
    const match = year.match(/^(\d{4})/);
    const start = match ? parseInt(match[1], 10) : 0;
    return start >= from && start <= to;
  }

  private scrollToPeriod(slug: string) {
    const id = `p-${slug}`;

    // Usamos NgZone + requestAnimationFrame para asegurar que el DOM esté pintado
    this.zone.runOutsideAngular(() => {
      const tryScroll = (attempts = 0) => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // (Opcional) pequeño highlight
          el.animate?.([{ opacity: 0.6 }, { opacity: 1 }], { duration: 250, easing: 'ease-out' });
          return;
        }
        if (attempts < 10) {
          requestAnimationFrame(() => tryScroll(attempts + 1));
        }
      };
      requestAnimationFrame(() => tryScroll());
    });
  }
}
