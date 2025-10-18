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
    this._list.set([item]);
    this._index.set(0);
    this._visible.set(true);
    document.body.style.overflow = 'hidden';
  }

  openWith(list: ReadonlyArray<GalleryItem>, index: number) {
    this._list.set(list.slice());
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
