import { Component, Input } from '@angular/core';
import { NavColumn, NavbarColumn } from '../navbar-column/navbar-column.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'fv-navbar-panel-desktop',
  imports: [CommonModule, NavbarColumn],
  templateUrl: './navbar-panel-desktop.component.html'
})
export class NavbarPanelDesktopComponent {
  @Input({ required: true }) columns!: NavColumn[];
}
