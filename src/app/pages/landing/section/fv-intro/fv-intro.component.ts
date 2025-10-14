import { Component, Input } from '@angular/core';
import { ImgComponent } from '../../../../shared/ui/img/img.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'fv-intro',
  imports: [ImgComponent, CommonModule],
  templateUrl: './fv-intro.component.html',
})
export class FvIntroComponent {
  @Input() image = 'assets/img/landing/LOGO1-prueba-final.jpg';
  @Input() alt = 'Logos de la Fundación Villanueva';

  @Input() titleLine1 = 'Fundación';
  @Input() titleLine2 = 'Villanueva';

  @Input() paragraphs: string[] = [];

  isInternal(link: string): boolean {
    return typeof link === 'string' && link.startsWith('/');
  }
}
