import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnDestroy {
  hidden = true;
  private lastY = 0;
  private onScroll = () => {
    const y = window.scrollY;
    const goingUp = y < this.lastY;
    const atTop = y <= 8;
    const nearBottom = window.innerHeight + y >= document.documentElement.scrollHeight - 120;

    this.hidden = nearBottom ? true : !(goingUp || atTop);
    this.lastY = y;
  };

  constructor() {
    this.lastY = window.scrollY;
    window.addEventListener('scroll', this.onScroll, { passive: true });
    this.onScroll();
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  }
}
