import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export type Cat = 'todos' | 'articulo' | 'escrito' | 'conferencia';

@Component({
  selector: 'archivo-filter',
  imports: [CommonModule],
  templateUrl: './archivo-filter.component.html',
})
export class ArchivoFilterComponent {
  @Input()  selected: Cat = 'todos';
  @Output() selectedChange = new EventEmitter<Cat>();

  options: { key: Cat; label: string }[] = [
    { key: 'todos',       label: 'Todos' },
    { key: 'articulo',    label: 'Artículos' },
    { key: 'escrito',     label: 'Escritos' },
    { key: 'conferencia', label: 'Conferencias' },
  ];

  select(cat: Cat) {
    if (this.selected !== cat) {
      this.selected = cat;
      this.selectedChange.emit(cat);
    }
  }

  isActive(cat: Cat) { return this.selected === cat; }
}
