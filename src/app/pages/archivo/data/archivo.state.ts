import { Injectable, computed, effect, signal, inject } from '@angular/core';
import { ArchivoDataService } from '../services/archivo-data.service';
import { ArchivoItem } from '../interface/archivo.interface';

export type Cat = 'todos' | 'articulo' | 'escrito' | 'conferencia';

@Injectable({ providedIn: 'root' })
export class ArchivoState {

  private data = inject(ArchivoDataService);
  items     = signal<ArchivoItem[]>([]);
  loading   = signal(true);
  filtering = signal(false);
  category  = signal<Cat>('todos');
  readerOpen = signal(false);
  readerItem = signal<ArchivoItem | undefined>(undefined);
  visibleItems = computed(() => {
    const cat = this.category();
    const all = this.items();
    return cat === 'todos' ? all : all.filter(i => i.category === cat);
  });

  constructor() {
    this.data.getAllArchivos().subscribe(items => {
      this.items.set(items);
      this.loading.set(false);
    });

    effect(() => {
      const cat = this.category();
      const open = this.readerOpen();
      const item = this.readerItem();
      if (open && item && cat !== 'todos' && item.category !== cat) this.closeReader();
    });
  }

  setCategory(cat: Cat) {
    if (this.category() === cat) return;
    this.filtering.set(true);
    this.category.set(cat);
    setTimeout(() => this.filtering.set(false), 350);
  }

  openReader(it: ArchivoItem) {
    this.readerItem.set(it);
    this.readerOpen.set(true);
    document.body.style.overflow = 'hidden';
  }
  closeReader() {
    this.readerOpen.set(false);
    this.readerItem.set(undefined);
    document.body.style.overflow = '';
  }
}
