import { CommonModule } from '@angular/common';
import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'timeline-rail',
  templateUrl: './timeline-rail.component.html',
  imports: [CommonModule],
  styles: [`
    .rail-dot { background-image: repeating-linear-gradient(to bottom, currentColor 0 6px, transparent 6px 14px); }
    .segment { transition: height .25s ease, top .25s ease, opacity .2s ease; }
  `]
})
export class TimelineRailComponent {
  @Input() segment: { top: number; height: number } | null = null;
  @Input() top = 80;
  @Input() bottom = 24;
  @Input() thickness = 2;
  @Input() centerOffset = 28;
  @Input() mobileLeftA = 14;
  @Input() mobileLeftB = 28;

  @HostBinding('style.position') p = 'absolute';
  @HostBinding('style.insetInline') ii = '0';
  @HostBinding('style.pointerEvents') pe = 'none';
}
