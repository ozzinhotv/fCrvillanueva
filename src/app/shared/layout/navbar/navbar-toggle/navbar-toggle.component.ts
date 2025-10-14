import { Component, computed } from '@angular/core';
import { NavbarState } from '../navbar.state';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'fv-navbar-toggle',
  imports: [CommonModule],
  templateUrl: './navbar-toggle.component.html'
})
export class NavbarToggleComponent {
  constructor(public state: NavbarState) {}
  isOpen = computed(() => this.state.isOpen());
}
