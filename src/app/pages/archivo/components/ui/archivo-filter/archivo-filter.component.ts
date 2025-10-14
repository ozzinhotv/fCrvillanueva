import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export type ArchivoCategory = 'todos' | 'articulo' | 'escrito' | 'conferencia';

@Component({
  selector: 'archivo-filter',
  imports: [CommonModule],
  templateUrl: './archivo-filter.component.html',
})
export class ArchivoFilterComponent {
  @Input() selected: ArchivoCategory = 'todos';
  @Output() selectedChange = new EventEmitter<ArchivoCategory>();

  categories: { key: ArchivoCategory; label: string }[] = [
    { key: 'todos',        label: 'Todos' },
    { key: 'articulo',     label: 'Artículos' },
    { key: 'escrito',      label: 'Escritos' },
    { key: 'conferencia',  label: 'Conferencias' },
  ];

  select(cat: ArchivoCategory) {
    if (this.selected !== cat) {
      this.selected = cat;
      this.selectedChange.emit(cat);
    }
  }
}
