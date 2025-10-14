import { CommonModule } from '@angular/common';
import { Component, Input} from '@angular/core';

@Component({
  selector: 'card-text',
  imports: [CommonModule],
  templateUrl: './card-text.component.html',
})
export class CardTextComponent {
  @Input() text = '';
 }
