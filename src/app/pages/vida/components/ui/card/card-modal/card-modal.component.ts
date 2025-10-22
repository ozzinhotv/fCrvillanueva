import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { CloseIconComponent } from "../../../../../../shared/ui/icon/close-icon/close-icon.component";

@Component({
  selector: 'card-modal',
  imports: [CommonModule, CloseIconComponent],
  templateUrl: './card-modal.component.html',
})
export class CardModalComponent {
  @Input() open = false;
  @Input() img: string | null | undefined = '';
  @Input() alt = '';
  @Output() close = new EventEmitter<void>();

  @HostListener('document:keydown.escape')
  onEsc() { if (this.open) this.close.emit(); }
}
