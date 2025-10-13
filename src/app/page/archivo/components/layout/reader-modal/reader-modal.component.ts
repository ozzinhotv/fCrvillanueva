import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ArchivoItem } from '../../../interface/archivo.interface';

@Component({
  selector: 'reader-modal',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './reader-modal.component.html',
})
export class ReaderModalComponent implements OnInit {
  @Input({ required: true }) item!: ArchivoItem;
  @Output() close = new EventEmitter<void>();

  loading = true;
  error = false;
  content = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get(this.item.contentPath, { responseType: 'text' }).subscribe({
      next: (txt) => { this.content = txt; this.loading = false; },
      error: () => { this.error = true; this.loading = false; }
    });
  }

  onClose() {
    this.close.emit();
  }

  // Cerrar con tecla ESC
  @HostListener('window:keydown.escape')
  onEsc() {
    this.onClose();
  }
}
