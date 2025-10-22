import { Component, Input, Output, EventEmitter, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../ui/card/card.component';

export type TrailSegEvent = { id: number; seg: { top: number; height: number; closing?: boolean } | null };

@Component({
  selector: 'timeline-item',
  imports: [CommonModule, CardComponent],
  templateUrl: './timeline-item.component.html',
})
export class TimelineItemComponent implements AfterViewInit, OnDestroy {
  @Input() id!: number;
  @Input() item: any;
  @Input() side: 'left' | 'right' = 'left';
  @Output() segmentChange = new EventEmitter<TrailSegEvent>();

  private open = false;
  private roSection?: ResizeObserver;
  private roList?: ResizeObserver;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit() {
    window.addEventListener('resize', this.onResize, { passive: true });
    window.addEventListener('scroll', this.onScroll, { passive: true });
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('scroll', this.onScroll);
    this.stopObservers();
  }

  onCardExpandedChange(open: boolean) {
    this.open = open;

    if (open) {
      this.startObservers();
      // Emito SEGMENTO FINAL inmediatamente (sin esperar transición del card)
      const seg = this.measureFinal();
      if (seg) this.segmentChange.emit({ id: this.id, seg });
      return;
    }

    // Cierre: elimino inmediatamente el segmento
    this.segmentChange.emit({ id: this.id, seg: null });
    this.stopObservers();
  }

  // --- Observadores sobre contenedores que cambian el layout ---
  private startObservers() {
    this.stopObservers();
    const section = this.closestSection();
    const list = this.closestList();
    this.roSection = new ResizeObserver(() => this.emitNow());
    if (section) this.roSection.observe(section);
    this.roList = new ResizeObserver(() => this.emitNow());
    if (list) this.roList.observe(list);
  }

  private stopObservers() {
    this.roSection?.disconnect(); this.roSection = undefined;
    this.roList?.disconnect(); this.roList = undefined;
  }

  // --- Emisión síncrona, sin rAF/timeout ---
  private emitNow() {
    if (!this.open) return;
    const seg = this.measureSync();
    if (seg) this.segmentChange.emit({ id: this.id, seg });
  }

  // --- Medición instantánea (estado actual en pantalla) ---
  private measureSync(): { top: number; height: number } | null {
    const section = this.closestSection();
    if (!section) return null;
    const railTop = parseFloat(getComputedStyle(section).getPropertyValue('--railTop')) || 0;
    const sectionRect = section.getBoundingClientRect();
    const card = this.cardEl() || this.el.nativeElement;
    const rect = card.getBoundingClientRect();
    const top = rect.top - sectionRect.top - railTop;
    const height = rect.height;
    return height > 0 ? { top, height } : null;
  }

  // --- Medición de ALTURA FINAL al abrir (usa scrollHeight del contenido colapsable) ---
  private measureFinal(): { top: number; height: number } | null {
    const section = this.closestSection();
    if (!section) return null;
    const railTop = parseFloat(getComputedStyle(section).getPropertyValue('--railTop')) || 0;

    const card = this.cardEl();
    const content = this.cardContent();
    if (!card) return this.measureSync();
    const sectionRect = section.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();

    // base = todo lo que NO es el contenido colapsable (header, paddings, bordes, etc.)
    const contentRect = content?.getBoundingClientRect();
    const base = contentRect ? (cardRect.height - contentRect.height) : cardRect.height;

    // altura final = base + scrollHeight REAL del contenido
    const finalContent = content ? content.scrollHeight : (contentRect?.height ?? 0);
    const finalHeight = Math.max(0, base + finalContent);

    const top = cardRect.top - sectionRect.top - railTop;
    return { top, height: finalHeight };
  }

  private closestSection(): HTMLElement | null {
    return this.el.nativeElement.closest('section');
  }
  private closestList(): HTMLElement | null {
    return this.el.nativeElement.closest('ol');
  }
  private cardEl(): HTMLElement | null {
    return this.el.nativeElement.querySelector('[data-card]') as HTMLElement | null;
  }
  private cardContent(): HTMLElement | null {
    // El div colapsable del card tiene la clase de transición
    return this.el.nativeElement.querySelector('[data-card] .transition-all') as HTMLElement | null;
  }

  private onResize = () => { this.emitNow(); };
  private onScroll  = () => { this.emitNow(); };
}
