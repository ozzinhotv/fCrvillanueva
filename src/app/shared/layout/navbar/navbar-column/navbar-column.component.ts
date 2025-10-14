import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

type LinkItem = { label: string; path: string | any[]; queryParams?: Record<string, any> };
export type NavColumn = { title: string; items: LinkItem[] };

@Component({
  selector: 'fv-navbar-column',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar-column.component.html',
})
export class NavbarColumn {
  @Input({ required: true }) data!: NavColumn;
}
