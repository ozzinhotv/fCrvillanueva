// src/app/pages/obra/components/gallery/ui/lightbox.service.ts
import { Injectable, signal, computed } from '@angular/core';
import { GalleryItem } from '../interfaces/gallery-item.interface';

@Injectable({ providedIn: 'root' })
export class LightboxService {
  private _visible = signal(false);
  private _list = signal<GalleryItem[]>([]);
  private _index = signal<number>(0);

  visible = this._visible.asReadonly();
  item = computed(() => {
    const list = this._list();
    const i = this._index();
    return list.length ? list[i] : null;
  });

  open(item: GalleryItem) {
    // fallback: abrir solo ese item
    this._list.set([item]);
    this._index.set(0);
    this._visible.set(true);
    document.body.style.overflow = 'hidden';
  }

  /** Úsalo cuando abras desde una sección: pásale TODA la lista y el índice */
  openWith(list: ReadonlyArray<GalleryItem>, index: number) {
    this._list.set(list.slice());   // copia
    this._index.set(index);
    this._visible.set(true);
    document.body.style.overflow = 'hidden';
  }

  close() {
    this._visible.set(false);
    this._list.set([]);
    this._index.set(0);
    document.body.style.overflow = '';
  }

  prev() {
    const n = this._list().length;
    if (!n) return;
    this._index.set((this._index() - 1 + n) % n);
  }

  next() {
    const n = this._list().length;
    if (!n) return;
    this._index.set((this._index() + 1) % n);
  }
}
