// src/app/page/obra/obra-redirect.component.ts
import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NAV_INDEX } from '../../data/obra.registry';  // <-- nuevo registry plano

@Component({
  standalone: true,
  template: `<span class="sr-only">Redirigiendo…</span>`,
})
export class ObraRedirectComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  constructor() {
    const cat = this.route.snapshot.paramMap.get('cat') ?? '';

    // categoría inválida -> landing de obra
    const works = NAV_INDEX[cat];
    if (!works || works.length === 0) {
      this.router.navigateByUrl('/obra', { replaceUrl: true });
      return;
    }

    // default = primer slug del índice
    const work = works[0];
    this.router.navigate(['/obra', cat, work], { replaceUrl: true });
  }
}
