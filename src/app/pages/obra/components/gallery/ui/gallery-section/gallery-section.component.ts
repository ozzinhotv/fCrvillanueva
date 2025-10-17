import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild, ElementRef, OnChanges, SimpleChanges, AfterViewInit, computed, inject } from '@angular/core';
import { GalleryItem } from '../../../../interfaces/gallery-item.interface';
import { GalleryCardComponent } from '../gallery-card/gallery-card.component';
import { DropdownIconComponent } from '../../../../../../shared/ui/icon/dropdown-icon/dropdown-icon.component';
import { LightboxService } from '../../../../service/lightbox.service';

@Component({
  selector: 'gallery-section',
  standalone: true,
  imports: [CommonModule, GalleryCardComponent, DropdownIconComponent],
  templateUrl: './gallery-section.component.html',
})
export class GallerySectionComponent implements OnChanges, AfterViewInit {
  @Input() title = '';
  @Input() items: ReadonlyArray<GalleryItem> = [];
  @Input() expanded = false;
  @Output() expandedChange = new EventEmitter<boolean>();

  @ViewChild('content') contentRef!: ElementRef<HTMLDivElement>;
  maxH = 0;

  private lb = inject(LightboxService);
  openLightbox(item: GalleryItem) {
    const list = this.items ?? [];
    const index = list.findIndex(i => i.id === item.id);
    this.lb.openWith(list, Math.max(0, index));
  }

  lightboxOpen = false;
  current: GalleryItem | null = null;

  private readonly hoverable =
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  ngAfterViewInit() { this.recomputeHeight(); }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['expanded']) {
      requestAnimationFrame(() => this.recomputeHeight());
    }
  }

  private recomputeHeight() {
    const el = this.contentRef?.nativeElement;
    if (!el) return;
    this.maxH = this.expanded ? el.scrollHeight : 0;
  }

  toggle() { this.expandedChange.emit(!this.expanded); }
  onEnter() { if (this.hoverable) this.expandedChange.emit(true); }
  onLeave() { if (this.hoverable) this.expandedChange.emit(false); }


  closeLightbox() {
    this.lightboxOpen = false;
    this.current = null;
  }
  onLightboxVisibleChange(v: boolean) {
    this.lightboxOpen = v;
    if (!v) this.current = null;
  }
}

