import { Component, Input } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { TimelineGroupComponent } from './timeline-group/timeline-group.component';
import { TimelineGroup } from '../../interfaces/timeline-group.interface';

@Component({
  selector: 'timeline',
  standalone: true,
  imports: [CommonModule, NgFor, TimelineGroupComponent],
  templateUrl: './timeline.component.html',
})
export class TimelineComponent {
  @Input() groups: TimelineGroup[] = [];

  // Genera ids estables tipo: p-1900-1928, p-1929-1940, ...
  idFromLabel(label: string): string {
    return 'p-' + label
      .replace(/[^\d]+/g, '-')     // todo lo no numérico a guiones
      .replace(/^-+|-+$/g, '')     // recorta guiones al inicio/fin
      .replace(/-+/g, '-');        // colapsa múltiples guiones
  }
}
