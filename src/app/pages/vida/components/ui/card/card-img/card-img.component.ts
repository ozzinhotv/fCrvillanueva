import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'card-img',
  imports: [CommonModule],
  templateUrl: './card-img.component.html',
})
export class CardImageComponent {
  @Input() img: string | null | undefined;
  @Input() color: string = '#ef4444';
  @Input() rounded = 'rounded-xl';

  get isImg(): boolean {
    return !!this.img && this.img.trim().length > 0;
  }

  get bgStyle(): Record<string, string> {
    const c = this.color && (this.color.startsWith('#') || this.color.startsWith('rgb')) ? this.color : '#ef4444';
    return {
      background: `repeating-linear-gradient(135deg, ${c} 0 16px, transparent 16px 32px)`
    };
  }
}
