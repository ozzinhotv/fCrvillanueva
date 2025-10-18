import { CommonModule } from '@angular/common';
import { Component, Input, computed, signal } from '@angular/core';
import { ObraGallery } from '../../interfaces/obra-gallery.interface';
import { GalleryItem } from '../../interfaces/gallery-item.interface';
import { GallerySectionComponent } from './ui/gallery-section/gallery-section.component';

type Cat = 'plans' | 'construction' | 'completed';

@Component({
  selector: 'obra-gallery',
  standalone: true,
  imports: [CommonModule, GallerySectionComponent],
  templateUrl: './gallery.component.html',
})
export class GalleryComponent {
  @Input() gallery?: ObraGallery;

  private items(): GalleryItem[] { return this.gallery?.items ?? []; }

  plans        = computed(() => this.items().filter(i => i.category === 'plans'));
  construction = computed(() => this.items().filter(i => i.category === 'construction'));
  completed    = computed(() => this.items().filter(i => i.category === 'completed'));

  open = signal<Cat | null>(null);

  setOpen(section: Cat, isOpen: boolean) {
    this.open.set(isOpen ? section : (this.open() === section ? null : this.open()));
    if (isOpen) this.open.set(section);
  }
  isOpen(section: Cat): boolean { return this.open() === section; }
}
