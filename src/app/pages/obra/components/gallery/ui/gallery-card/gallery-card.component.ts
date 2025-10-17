import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { GalleryItem } from '../../../../interfaces/gallery-item.interface';

@Component({
  selector: 'gallery-card',
  imports: [CommonModule],
  templateUrl: './gallery-card.component.html',
  styles: ``
})
export class GalleryCardComponent {
  @Input() item!: GalleryItem;

  placeholderFor(cat: GalleryItem['category'] | undefined): string {
    switch (cat) {
      case 'plans':        return 'bg-sky-300';
      case 'construction': return 'bg-amber-300';
      case 'completed':    return 'bg-emerald-300';
      default:             return 'bg-neutral-200';
    }
  }
}
