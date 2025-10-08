import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardHeaderComponent } from './card-header/card-header.component';
import { CardTextComponent } from './card-text/card-text.component';
import { CardImageComponent } from './card-img/card-img.component';
import { DropdownIconComponent } from "../../../../../shared/ui/dropdown-icon/dropdown-icon.component";

@Component({
  selector: 'vida-card',
  imports: [
    CommonModule,
    CardHeaderComponent,
    CardTextComponent,
    CardImageComponent,
],
  templateUrl: './card.component.html',
})
export class CardComponent {
  @Input() year!: string | number;
  @Input() title = '';
  @Input() text = '';
  @Input() placeholderColor = '#e5e7eb';
  @Input() imageSide: 'left' | 'right' = 'right';

  expanded = false;
  toggle() { this.expanded = !this.expanded; }
}
