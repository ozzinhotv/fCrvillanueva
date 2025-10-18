import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'icon-chevron-left',
  imports: [CommonModule],
  templateUrl: './chevron-left.component.html',
})
export class ChevronLeftComponent {
  @Input() size: number = 28;
  @Input() stroke: number = 2;
  @Input() ariaLabel = 'Previous';
}
