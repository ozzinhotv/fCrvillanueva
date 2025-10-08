import { Component } from '@angular/core';
import { HeroComponent } from '../../shared/layout/hero/hero.component';
import { TextBlockComponent } from './components/text-block/text-block.component';
import { GalleryComponent } from './components/gallery/gallery.component';

import { AULA_MAGNA_DATA } from './data/ciudad-universitaria/aula-magna.data';
import { ObraData } from './interfaces/obra-data.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-obra',
  standalone: true,
  imports: [CommonModule, HeroComponent, TextBlockComponent, GalleryComponent],
  templateUrl: './obra.component.html',
})
export class ObraComponent {
  // Por ahora trabajamos con una obra fija para validar el flujo:
  data: ObraData = AULA_MAGNA_DATA;
}
