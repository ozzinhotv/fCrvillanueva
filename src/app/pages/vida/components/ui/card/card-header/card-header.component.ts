import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'card-header',
  imports: [CommonModule],
  templateUrl: './card-header.component.html',
})
export class CardHeaderComponent {
  @Input() year!: string | number;
  @Input() title = '';

}
