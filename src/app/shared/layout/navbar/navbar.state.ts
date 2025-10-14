import { Injectable, signal } from '@angular/core';

@Injectable()
export class NavbarState {
  isOpen = signal(false);
  toggle() { this.isOpen.update(v => !v); }
  close()  { this.isOpen.set(false); }
}
