import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

export type Side = 'left' | 'right';
export interface SidebarChildLink { label: string; routerLink: string; }
export interface SidebarLink {
  label: string;
  routerLink?: string;              // si quieres que el padre sea clicable
  children?: SidebarChildLink[];    // sublabels opcionales
}

@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  @Input() isOpen = false;
  @Input() side: Side = 'right';
  @Input() links: SidebarLink[] = [];
  @Output() closed = new EventEmitter<void>();

  close() { if (this.isOpen) { this.isOpen = false; this.closed.emit(); } }
}
