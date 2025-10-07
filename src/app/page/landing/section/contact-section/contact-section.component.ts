import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DropdownIconComponent } from "../../../../shared/ui/dropdown-icon/dropdown-icon.component";

type ItemType = 'list' | 'rich';

interface AccordionItem {
  title: string;
  type: ItemType;
  lines?: string[];
  text?: string;
  email?: string;
}

@Component({
  selector: 'contact-section',
  templateUrl: './contact-section.component.html',
  imports: [CommonModule, DropdownIconComponent],
})
export class ContactSectionComponent {
  items: AccordionItem[] = [
    {
      title: 'Nosotros',
      type: 'list',
      lines: [
        'Paulina Villanueva - Directora',
        'Adriana Villanueva - Subdirectora',
        'Cecilia Castrillo - Asistente de Dirección',
      ],
    },
    {
      title: 'Email',
      type: 'rich',
      text: 'Para consultar cualquier información, envíanos un correo y con gusto te atenderemos.',
      email: 'fcmvillanueva@gmail.com',
    },
  ];

  trackByTitle = (_: number, item: AccordionItem) => item.title;
}
