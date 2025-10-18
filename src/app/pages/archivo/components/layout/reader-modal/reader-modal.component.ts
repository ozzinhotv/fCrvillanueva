import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output, AfterViewInit } from '@angular/core';
import { ArchivoItem } from '../../../interface/archivo.interface';

@Component({
  selector: 'reader-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reader-modal.component.html',
})
export class ReaderModalComponent implements AfterViewInit {
  @Input({ required: true }) item!: ArchivoItem;
  @Output() close = new EventEmitter<void>();

  entered = false; // animación de entrada
  closing = false; // animación de salida

  ngAfterViewInit(): void {
    requestAnimationFrame(() => { this.entered = true; });
  }

  requestClose() {
    if (this.closing) return;
    this.closing = true;
    setTimeout(() => this.close.emit(), 300); // debe coincidir con duration-300
  }

  @HostListener('document:keydown.escape')
  onEsc() { this.requestClose(); }
}
