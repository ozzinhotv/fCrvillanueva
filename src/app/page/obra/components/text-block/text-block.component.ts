import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'obra-text-block',
  imports: [CommonModule],
  templateUrl: './text-block.component.html',
})
export class TextBlockComponent {
  @Input() category = '';
  @Input() work = '';
  @Input() contentHtml = '';
 }
