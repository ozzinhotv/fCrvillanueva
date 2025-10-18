import { Component, Input } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { TimelineGroupComponent } from './timeline-group/timeline-group.component';
import { TimelineGroup } from '../../interfaces/timeline-group.interface';

@Component({
  selector: 'timeline',
  imports: [CommonModule, NgFor, TimelineGroupComponent],
  templateUrl: './timeline.component.html',
})
export class TimelineComponent {
  @Input() groups: TimelineGroup[] = [];

  idFromLabel(label: string): string {
    return 'p-' + label
      .replace(/[^\d]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .replace(/-+/g, '-');
  }
}
