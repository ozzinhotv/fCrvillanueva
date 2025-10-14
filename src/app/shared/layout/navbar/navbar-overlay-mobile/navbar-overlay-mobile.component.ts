import { Component, computed } from '@angular/core';
import { NavbarState } from '../navbar.state';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'fv-navbar-overlay-mobile',
  imports: [CommonModule],
  templateUrl: './navbar-overlay-mobile.component.html'
})
export class NavbarOverlayMobileComponent {
  constructor(public state: NavbarState) {}
  isOpen = computed(() => this.state.isOpen());
}
