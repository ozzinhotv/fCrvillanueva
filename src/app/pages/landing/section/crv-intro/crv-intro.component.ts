import { Component, Input } from '@angular/core';
import { ImgComponent } from '../../../../shared/ui/img/img.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'crv-intro',
  standalone: true,
  imports: [ImgComponent, RouterLink, CommonModule],
  templateUrl: './crv-intro.component.html',
})
export class CrvIntroComponent {
  @Input() image = 'assets/img/landing/CRVsilladelDiablo.jpg';
  @Input() alt = 'Silla del Diablo';

  @Input() titleLine1 = 'Carlos Raúl';
  @Input() titleLine2 = 'Villanueva';

  @Input() paragraphs: string[] = [];

  @Input() ctaLabel = 'Conocer más';
  @Input() ctaLink = '/vida'; // del JSON como string

  isInternal(link: string): boolean {
    return typeof link === 'string' && link.startsWith('/');
  }
}
