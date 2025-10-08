import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ObraGallery } from '../../interfaces/obra-gallery.interface';

@Component({
  selector: 'obra-gallery',
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
})
export class GalleryComponent {
  @Input() gallery?: ObraGallery;
}

