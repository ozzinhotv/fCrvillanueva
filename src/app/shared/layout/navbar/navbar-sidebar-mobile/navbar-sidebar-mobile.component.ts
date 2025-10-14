import { Component, computed } from '@angular/core';
import { Input } from '@angular/core';
import { NavbarState } from '../navbar.state';
import { NavColumn } from '../navbar-column/navbar-column.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'fv-navbar-sidebar-mobile',
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar-sidebar-mobile.component.html'
})
export class NavbarSidebarMobileComponent {
  constructor(public state: NavbarState) {}
  isOpen = computed(() => this.state.isOpen());
  @Input({ required: true }) columns!: NavColumn[];
  }
