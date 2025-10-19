import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type Seg = { top: number; height: number; closing?: boolean };

@Component({
  selector: 'timeline-rail',
  imports: [CommonModule],
  templateUrl: './timeline-rail.component.html',
})
export class TimelineRailComponent {
  @Input() segments: Seg[] = [];
}
