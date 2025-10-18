import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineItemComponent } from '../timeline-item/timeline-item.component';
import { TimelineRailComponent } from '../timeline-rail/timeline-rail.component';

@Component({
  selector: 'timeline-group',
  imports: [CommonModule, TimelineItemComponent, TimelineRailComponent],
  templateUrl: './timeline-group.component.html',
})
export class TimelineGroupComponent {
  @Input() label = '';
  @Input() bgClass = 'bg-white';
  @Input() items: any[] = [];
  active: { top: number; height: number } | null = null;
}
