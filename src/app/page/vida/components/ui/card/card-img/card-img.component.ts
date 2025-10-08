import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'card-img',
  imports: [CommonModule],
  templateUrl: './card-img.component.html',
})
export class CardImageComponent {
  @Input() color = '#e5e7eb';        // placeholder
  @Input() aspect = 'aspect-[4/3]';  // tailwind
  @Input() rounded = 'rounded-xl';
}
