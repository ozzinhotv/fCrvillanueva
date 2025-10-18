import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { ArchivoDataService } from './services/archivo-data.service';
import { ArchivoItem } from './interface/archivo.interface';

import { HeroComponent } from '../../shared/layout/hero/hero.component';
import { ArchivoFilterComponent } from './components/ui/archivo-filter/archivo-filter.component';
import { ArchivoFeedComponent } from './components/ui/archivo-feed/archivo-feed.component';
import { ReaderModalComponent } from './components/layout/reader-modal/reader-modal.component';

type Cat = 'todos' | 'articulo' | 'escrito' | 'conferencia';

@Component({
  selector: 'app-archivo',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeroComponent,
    ArchivoFilterComponent,
    ArchivoFeedComponent,
    ReaderModalComponent,
  ],
  templateUrl: './archivo.component.html',
})
export class ArchivoComponent implements OnInit {
  archivos: ArchivoItem[] = [];
  loading = true;        // carga inicial de JSON
  filtering = false;     // skeleton al cambiar de filtro

  // Filtro
  selectedCategory: Cat = 'todos';
  get visibleItems(): ArchivoItem[] {
    if (this.selectedCategory === 'todos') return this.archivos;
    return this.archivos.filter(a => a.category === this.selectedCategory);
  }

  // Modal
  readerOpen = false;
  readerItem?: ArchivoItem;

  constructor(
    private data: ArchivoDataService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Sincroniza ?cat=
    this.route.queryParamMap.subscribe(q => {
      const cat = (q.get('cat') as Cat) || 'todos';
      if (['todos','articulo','escrito','conferencia'].includes(cat)) {
        this.selectedCategory = cat;
      }
    });

    // Carga de datos
    this.data.getAllArchivos().subscribe(items => {
      this.archivos = items;
      this.loading = false;
    });
  }

  onCategoryChange(cat: Cat) {
    if (this.selectedCategory === cat) return;

    // Skeleton inmediato para UX suave
    this.filtering = true;
    this.selectedCategory = cat;

    // si el modal está abierto y el item ya no calza, ciérralo
    if (this.readerOpen && this.readerItem && cat !== 'todos' && this.readerItem.category !== cat) {
      this.closeReader();
    }

    // sincroniza ?cat=
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { cat },
      queryParamsHandling: 'merge',
    });

    // pequeño delay para que el skeleton se perciba (ajusta 250–400ms)
    setTimeout(() => { this.filtering = false; }, 350);
  }

  openItem(it: ArchivoItem) {
    this.readerItem = it;
    this.readerOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeReader() {
    this.readerOpen = false;
    this.readerItem = undefined;
    document.body.style.overflow = '';
  }
}
