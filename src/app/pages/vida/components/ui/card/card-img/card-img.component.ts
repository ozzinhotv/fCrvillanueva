import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'card-img',
  imports: [CommonModule],
  templateUrl: './card-img.component.html',
})
export class CardImageComponent {
  @Input() color = 'bg-red-600';
  @Input() aspect = 'aspect-[4/3]';
  @Input() rounded = 'rounded-xl';
}
