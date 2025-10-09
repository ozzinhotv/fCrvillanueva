// src/app/page/obra/obra-redirect.component.ts
import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NAV_INDEX, getDefaultWork } from '../../data/registry';


@Component({
  standalone: true,
  template: `<span class="sr-only">Redirigiendo…</span>`,
})
export class ObraRedirectComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  constructor() {
    const cat = this.route.snapshot.paramMap.get('cat') ?? '';
    if (!NAV_INDEX[cat]) {
      // categoría inválida -> landing
      this.router.navigateByUrl('/obra', { replaceUrl: true });
      return;
    }
    const work = getDefaultWork(cat);
    if (!work) {
      this.router.navigateByUrl('/obra', { replaceUrl: true });
      return;
    }
    this.router.navigate(['/obra', cat, work], { replaceUrl: true });
  }
}
