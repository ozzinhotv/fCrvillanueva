import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardHeaderComponent } from './card-header/card-header.component';
import { CardTextComponent } from './card-text/card-text.component';
import { CardImageComponent } from './card-img/card-img.component';
import { CardModalComponent } from './card-modal/card-modal.component';

@Component({
  selector: 'vida-card',
  imports: [CommonModule, CardHeaderComponent, CardTextComponent, CardImageComponent, CardModalComponent],
  templateUrl: './card.component.html',
})
export class CardComponent {
  @Input() year!: string | number;
  @Input() title = '';
  @Input() text = '';
  @Input() placeholderColor = '#ef4444';
  @Input() imageSide: 'left' | 'right' = 'right';
  @Input() img: string | null | undefined = '';

  @Output() expandedChange = new EventEmitter<boolean>();

  expanded = false;
  modalOpen = false;

  toggle() {
    this.expanded = !this.expanded;
    this.expandedChange.emit(this.expanded);
  }

  openModal() {
    if (this.img && this.img.trim().length > 0) this.modalOpen = true;
  }
}
