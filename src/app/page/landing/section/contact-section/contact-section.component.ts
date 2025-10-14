import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DropdownIconComponent } from '../../../../shared/ui/dropdown-icon/dropdown-icon.component';

type ItemType = 'list' | 'rich';

export interface AccordionItem {
  title: string;
  type: ItemType;
  lines?: string[];
  text?: string;
  email?: string;
}

@Component({
  selector: 'contact-section',
  standalone: true,
  templateUrl: './contact-section.component.html',
  imports: [CommonModule, DropdownIconComponent],
})
export class ContactSectionComponent {
  @Input() items: AccordionItem[] = [];

  trackByTitle = (_: number, item: AccordionItem) => item.title;
}
