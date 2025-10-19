import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineItemComponent, TrailSegEvent } from '../timeline-item/timeline-item.component';
import { TimelineRailComponent } from '../timeline-rail/timeline-rail.component';

type Seg = { top: number; height: number; closing?: boolean };

@Component({
  selector: 'timeline-group',
  imports: [CommonModule, TimelineItemComponent, TimelineRailComponent],
  templateUrl: './timeline-group.component.html',
})
export class TimelineGroupComponent {
  @Input() label = '';
  @Input() bgClass = 'bg-white';
  @Input() items: any[] = [];

  private segs = new Map<number, Seg>();
  private timers = new Map<number, any>();

  get segmentsArray(): Seg[] {
    return Array.from(this.segs.values());
  }

  onSegChange(e: TrailSegEvent) {
    const id = e.id;
    if (this.timers.has(id)) { clearTimeout(this.timers.get(id)); this.timers.delete(id); }

    if (!e.seg) { this.segs.delete(id); return; }

    this.segs.set(id, e.seg);

    if (e.seg.closing) {
      const t = setTimeout(() => { this.segs.delete(id); this.timers.delete(id); }, 400);
      this.timers.set(id, t);
    }
  }
}
