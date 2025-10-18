import { Component, EventEmitter, Input, Output, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../ui/card/card.component';
import { fromEvent } from 'rxjs';
import { auditTime } from 'rxjs/operators';

@Component({
  selector: 'timeline-item',
  imports: [CommonModule, CardComponent],
  templateUrl: './timeline-item.component.html',
})
export class TimelineItemComponent implements AfterViewInit {
  @Input() item: any;
  @Input() side: 'left' | 'right' = 'left';
  @Output() segmentChange = new EventEmitter<{ top: number; height: number } | null>();
  open = false;
  constructor(private el: ElementRef<HTMLElement>) {}
  ngAfterViewInit() {
    fromEvent(window, 'resize').pipe(auditTime(80)).subscribe(() => { if (this.open) this.emitSeg(); });
  }
  toggle() { this.open = !this.open; this.open ? this.emitSeg() : this.segmentChange.emit(null); }
  private emitSeg() {
    const host = this.el.nativeElement.closest('section') as HTMLElement;
    const groupRect = host.getBoundingClientRect();
    const itemRect = this.el.nativeElement.getBoundingClientRect();
    const card = this.el.nativeElement.querySelector('[data-card]') as HTMLElement;
    const cardRect = (card || this.el.nativeElement).getBoundingClientRect();
    const top = cardRect.top - itemRect.top + (itemRect.top - groupRect.top);
    const height = cardRect.height;
    this.segmentChange.emit({ top, height });
  }
}
