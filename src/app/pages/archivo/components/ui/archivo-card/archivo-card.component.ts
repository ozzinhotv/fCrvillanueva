import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ArchivoItem } from '../../../interface/archivo.interface';

@Component({
  selector: 'archivo-card',
  imports: [CommonModule],
  templateUrl: './archivo-card.component.html',
})
export class ArchivoCardComponent {
  @Input({ required: true }) item!: ArchivoItem;
}
