import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './components/layout/timeline/timeline.component';
import { vidaCardData } from './data/vidaCard.data';
import { VidaCardItemData } from './data/vidaCard.data';
import { TimelineGroup } from './interfaces/timeline-group.interfaces';
import { HeroComponent } from '../../shared/layout/hero/hero.component';

@Component({
  selector: 'app-vida',
  standalone: true,
  imports: [CommonModule, TimelineComponent, HeroComponent],
  templateUrl: './vida.component.html',
})
export class VidaComponent {
  cards: VidaCardItemData[] = vidaCardData;

  // 👇 tu propiedad tipada con la interfaz TimelineGroup
  groups: TimelineGroup[] = [];

  constructor() {
    this.groups = [
      {
        label: '1900–1928',
        bgClass: 'bg-neutral-50',
        items: this.cards.filter(c => this.inRange(c.year, 1900, 1928)),
      },
      {
        label: '1929–1940',
        bgClass: 'bg-white',
        items: this.cards.filter(c => this.inRange(c.year, 1929, 1940)),
      },
      {
        label: '1941–1949',
        bgClass: 'bg-neutral-50',
        items: this.cards.filter(c => this.inRange(c.year, 1941, 1949)),
      },
      {
        label: '1950–1958',
        bgClass: 'bg-white',
        items: this.cards.filter(c => this.inRange(c.year, 1950, 1958)),
      },
      {
        label: '1959–1969',
        bgClass: 'bg-neutral-50',
        items: this.cards.filter(c => this.inRange(c.year, 1959, 1969)),
      },
      {
        label: '1970–1975',
        bgClass: 'bg-white',
        items: this.cards.filter(c => this.inRange(c.year, 1970, 1975)),
      },
    ];
  }

  private inRange(year: string, from: number, to: number): boolean {
    const match = year.match(/^(\d{4})/);
    const start = match ? parseInt(match[1], 10) : 0;
    return start >= from && start <= to;
  }
}
