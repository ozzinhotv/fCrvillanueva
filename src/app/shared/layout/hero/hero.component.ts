import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [CommonModule],
  templateUrl: './hero.component.html'
})
export class HeroComponent {
  @Input() image = '';
  @Input() title = '';
  @Input() subtitle?: string;
  @Input() pt: 'pt-16' | 'pt-20' | 'pt-24' = 'pt-20';
  @Input() overlayColor: string = '';
}
