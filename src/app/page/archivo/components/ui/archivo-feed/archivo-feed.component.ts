import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ArchivoCardComponent } from '../../ui/archivo-card/archivo-card.component';
import { ArchivoItem } from '../../../interface/archivo.interface';

type Cat = 'todos' | 'articulo' | 'escrito' | 'conferencia';

@Component({
  selector: 'archivo-feed',
  standalone: true,
  imports: [CommonModule, ArchivoCardComponent],
  templateUrl: './archivo-feed.component.html',
})
export class ArchivoFeedComponent {
  @Input() items: ArchivoItem[] = [];                           // ← el padre ya manda la lista visible
  @Input() selected: Cat = 'todos';                             // ← solo para estilos si quieres
  @Input() loading = false;

  // ✨ Lo clave: emitir el item con tipo correcto
  @Output() open = new EventEmitter<ArchivoItem>();

  trackById(_i: number, it: ArchivoItem) { return it.id; }
  openItem(it: ArchivoItem) { this.open.emit(it); }
}
