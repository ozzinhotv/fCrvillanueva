// layout/timeline-group/timeline-group.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineItemComponent } from '../timeline-item/timeline-item.component';

@Component({
  selector: 'timeline-group',
  standalone: true,
  imports: [CommonModule, TimelineItemComponent],
  templateUrl: './timeline-group.component.html',
})
export class TimelineGroupComponent {
  @Input() label = '';
  @Input() bgClass = 'bg-white';
  @Input() items: any[] = [];
}
