import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardHeaderComponent } from './card-header/card-header.component';
import { CardTextComponent } from './card-text/card-text.component';
import { CardImageComponent } from './card-img/card-img.component';

@Component({
  selector: 'vida-card',
  imports: [CommonModule, CardHeaderComponent, CardTextComponent, CardImageComponent],
  templateUrl: './card.component.html',
})
export class CardComponent {
  @Input() year!: string | number;
  @Input() title = '';
  @Input() text = '';
  @Input() placeholderColor = '#e5e7eb';
  @Input() imageSide: 'left' | 'right' = 'right';

  @Output() expandedChange = new EventEmitter<boolean>();

  expanded = false;
  toggle() {
    this.expanded = !this.expanded;
    this.expandedChange.emit(this.expanded);
  }
}
