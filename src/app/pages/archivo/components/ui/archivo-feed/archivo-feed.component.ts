import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ArchivoCardComponent } from '../archivo-card/archivo-card.component';
import { ArchivoItem } from '../../../interface/archivo.interface';

@Component({
  selector: 'archivo-feed',
  standalone: true,
  imports: [CommonModule, ArchivoCardComponent],
  templateUrl: './archivo-feed.component.html',
})
export class ArchivoFeedComponent {
  @Input() items: ArchivoItem[] = [];
  @Input() loading = false;
  @Output() open = new EventEmitter<ArchivoItem>();

  trackById(_i: number, it: ArchivoItem) { return it.id; }
  openItem(it: ArchivoItem) { this.open.emit(it); }
}
