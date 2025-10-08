import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../ui/card/card.component';


@Component({
  selector: 'timeline-item',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './timeline-item.component.html',
})
export class TimelineItemComponent {
  @Input() item: any; // luego lo tipamos con tu VM cuando quieras
}
