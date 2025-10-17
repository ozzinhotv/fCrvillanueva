import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output, OnChanges, OnDestroy } from '@angular/core';

import { GalleryItem } from '../../../../interfaces/gallery-item.interface';
import { ChevronLeftComponent } from '../../../../../../shared/ui/icon/chevron-left/chevron-left.component';
import { ChevronRightComponent } from '../../../../../../shared/ui/icon/chevron-right/chevron-right.component';

@Component({
  selector: 'gallery-lightbox',
  standalone: true,
  imports: [CommonModule, ChevronLeftComponent, ChevronRightComponent],
  templateUrl: './gallery-lightbox.component.html',
})
export class GalleryLightboxComponent implements OnChanges, OnDestroy {
  @Input() item: GalleryItem | null = null;
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() prev = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();

  close() {
    this.visibleChange.emit(false);
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    if (this.visible) this.close();
  }

  ngOnChanges() {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = this.visible ? 'hidden' : '';
  }

  ngOnDestroy() {
    if (typeof document !== 'undefined') document.body.style.overflow = '';
  }

  placeholderClass(it: GalleryItem | null): string {
    if (!it) return 'bg-neutral-300';
    if (it.placeholder) return it.placeholder; // usa el que pusiste en el JSON
    switch (it.category) {
      case 'plans':        return 'bg-gradient-to-br from-sky-300 via-indigo-400 to-blue-600';
      case 'construction': return 'bg-gradient-to-br from-amber-300 via-orange-400 to-rose-500';
      case 'completed':    return 'bg-gradient-to-br from-emerald-300 via-teal-400 to-green-600';
      default:             return 'bg-neutral-300';
    }
  }
}
