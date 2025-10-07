import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-img',
  imports: [],
  templateUrl: './img.component.html',
})
export class ImgComponent {
  @Input() image = '';
  @Input() alt = '';
}
