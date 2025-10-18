import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'icon-chevron-right',
  imports: [CommonModule],
  templateUrl: './chevron-right.component.html',
})
export class ChevronRightComponent {
  @Input() size: number = 28;
  @Input() stroke: number = 2;
  @Input() ariaLabel = 'Next';
}
