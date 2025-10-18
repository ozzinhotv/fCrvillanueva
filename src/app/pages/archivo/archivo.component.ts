// src/app/pages/archivo/archivo.component.ts
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { HeroComponent } from '../../shared/layout/hero/hero.component';
import { ArchivoFilterComponent } from './components/ui/archivo-filter/archivo-filter.component';
import { ArchivoFeedComponent } from './components/ui/archivo-feed/archivo-feed.component';
import { ReaderModalComponent } from './components/layout/reader-modal/reader-modal.component';

import { ArchivoState, Cat } from './data/archivo.state';
import { ArchivoItem } from './interface/archivo.interface';

@Component({
  selector: 'app-archivo',
  imports: [
    CommonModule, RouterModule,
    HeroComponent, ArchivoFilterComponent, ArchivoFeedComponent, ReaderModalComponent
  ],
  templateUrl: './archivo.component.html',
})
export class ArchivoComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  state = inject(ArchivoState);
  constructor() {
    this.route.queryParamMap.subscribe(q => {
      const cat = (q.get('cat') as Cat) || 'todos';
      if (['todos','articulo','escrito','conferencia'].includes(cat)) {
        this.state.setCategory(cat);
      }
    });
  }
  onCategoryChange(cat: Cat) {
    this.state.setCategory(cat);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { cat },
      queryParamsHandling: 'merge',
    });
  }
  openItem(it: ArchivoItem)  { this.state.openReader(it); }
  closeReader()              { this.state.closeReader();  }
}
