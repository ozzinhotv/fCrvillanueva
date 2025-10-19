import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../ui/card/card.component';

export type TrailSegEvent = { id: number; seg: { top: number; height: number; closing?: boolean } | null };

@Component({
  selector: 'timeline-item',
  imports: [CommonModule, CardComponent],
  templateUrl: './timeline-item.component.html',
})
export class TimelineItemComponent {
  @Input() id!: number;
  @Input() item: any;
  @Input() side: 'left' | 'right' = 'left';

  @Output() segmentChange = new EventEmitter<TrailSegEvent>();

  private open = false;
  private raf?: number;

  constructor(private el: ElementRef<HTMLElement>) {}

  onCardExpandedChange(open: boolean) {
    const dur = this.getTrailDurationMs();

    if (open) {
      this.open = true;

      const finalSeg = this.measure();
      if (!finalSeg) return;

      const startSeg = { top: finalSeg.top, height: 0 };
      this.segmentChange.emit({ id: this.id, seg: startSeg });

      cancelAnimationFrame(this.raf ?? 0);
      this.raf = requestAnimationFrame(() => {
        this.segmentChange.emit({ id: this.id, seg: finalSeg });
      });

      setTimeout(() => {
        const adjust = this.measure();
        if (adjust) this.segmentChange.emit({ id: this.id, seg: adjust });
      }, dur + 30);

      return;
    }

    if (this.open) {
      this.open = false;

      const now = this.measure();
      if (now) {
        this.segmentChange.emit({ id: this.id, seg: { ...now, closing: true } });
        cancelAnimationFrame(this.raf ?? 0);
        this.raf = requestAnimationFrame(() => {
          this.segmentChange.emit({ id: this.id, seg: { top: now.top, height: 0, closing: true } });
        });
        setTimeout(() => this.segmentChange.emit({ id: this.id, seg: null }), dur + 30);
      } else {
        this.segmentChange.emit({ id: this.id, seg: null });
      }
    }
  }

  private measure(): { top: number; height: number } | null {
    const section = this.el.nativeElement.closest('section') as HTMLElement | null;
    if (!section) return null;
    const railTop = parseFloat(getComputedStyle(section).getPropertyValue('--railTop')) || 0;
    const sectionRect = section.getBoundingClientRect();
    const cardEl = this.el.nativeElement.querySelector('[data-card]') as HTMLElement | null;
    const rect = (cardEl || this.el.nativeElement).getBoundingClientRect();
    const top = rect.top - sectionRect.top - railTop;
    const height = rect.height;
    return height > 0 ? { top, height } : null;
    }

  private getTrailDurationMs(): number {
    const section = this.el.nativeElement.closest('section') as HTMLElement | null;
    if (!section) return 380;
    const raw = getComputedStyle(section).getPropertyValue('--trailDur').trim();
    if (raw.endsWith('ms')) return parseFloat(raw);
    if (raw.endsWith('s')) return parseFloat(raw) * 1000;
    const n = parseFloat(raw);
    return isNaN(n) ? 380 : n;
  }
}
