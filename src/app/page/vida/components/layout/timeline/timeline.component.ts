import { Component, Input } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { TimelineGroupComponent } from './timeline-group/timeline-group.component';
import { TimelineGroup } from '../../../interfaces/timeline-group.interfaces'; // ajusta la ruta según tu árbol

@Component({
  selector: 'timeline',
  standalone: true,
  imports: [CommonModule, NgFor, TimelineGroupComponent],
  templateUrl: './timeline.component.html',
})
export class TimelineComponent {
  @Input() groups: TimelineGroup[] = [];
}
