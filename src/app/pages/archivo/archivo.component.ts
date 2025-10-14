import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { HeroComponent } from '../../shared/layout/hero/hero.component';
import { ArchivoDataService } from './services/archivo-data.service';
import { ArchivoItem } from './interface/archivo.interface';
import { ArchivoFilterComponent } from './components/ui/archivo-filter/archivo-filter.component';
import { ArchivoFeedComponent } from './components/ui/archivo-feed/archivo-feed.component';
import { ReaderModalComponent } from './components/layout/reader-modal/reader-modal.component';

@Component({
  selector: 'app-archivo',
  standalone: true,
  imports: [CommonModule, RouterModule, HeroComponent, ArchivoFilterComponent, ArchivoFeedComponent, ReaderModalComponent],
  templateUrl: './archivo.component.html',
})
export class ArchivoComponent implements OnInit {
  archivos: ArchivoItem[] = [];
  visibles: ArchivoItem[] = [];
  pageSize = 6;
  currentPage = 0;
  cargando = true;

  selectedCategory: 'todos' | 'articulo' | 'escrito' | 'conferencia' = 'todos';

  readerOpen = false;
  readerItem?: ArchivoItem;

  private hasData = false;

  constructor(
    private dataService: ArchivoDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // 1) aplicar ?cat= (si ya hay data, recalcula)
    this.route.queryParamMap.subscribe(q => {
      const cat = (q.get('cat') as any) || 'todos';
      if (['todos','articulo','escrito','conferencia'].includes(cat)) {
        this.selectedCategory = cat;
        if (this.hasData) this.resetPaginacion();
      }
    });

    // 2) cargar data y recalcular
    this.dataService.getAllArchivos().subscribe((data) => {
      this.archivos = data;
      this.hasData = true;
      this.resetPaginacion();
      this.cargando = false;

      // si hay params de modal, intenta abrir
      this.tryOpenFromParams(this.route.snapshot.paramMap);
    });

    // 3) escuchar /:category/:id para abrir/cerrar modal
    this.route.paramMap.subscribe(p => this.tryOpenFromParams(p));
  }

  // paginación
  private resetPaginacion() {
    this.currentPage = 0;
    this.visibles = [];
    this.mostrarMas();
  }

  mostrarMas() {
    const base = this.selectedCategory === 'todos'
      ? this.archivos
      : this.archivos.filter(a => a.category === this.selectedCategory);
    const start = this.currentPage * this.pageSize;
    const end   = start + this.pageSize;
    this.visibles = [...this.visibles, ...base.slice(start, end)];
    this.currentPage++;
  }

  onCategoryChange(cat: typeof this.selectedCategory) {
    this.selectedCategory = cat;
    this.router.navigate([], { queryParams: { cat }, queryParamsHandling: 'merge' });
    this.resetPaginacion();
  }

  onOpenItem(it: ArchivoItem) {
    this.router.navigate(['/archivo', it.category, it.id], { queryParams: { cat: this.selectedCategory } });
  }

  onCloseReader() {
    if (window.history.length > 1) history.back();
    else this.router.navigate(['/archivo'], { queryParams: { cat: this.selectedCategory } });
  }

  private tryOpenFromParams(p: ParamMap) {
    const id = p.get('id');
    const category = p.get('category') as any;
    if (!id || !category) {
      this.readerOpen = false;
      this.readerItem = undefined;
      document.body.style.overflow = '';
      return;
    }
    const found = this.archivos.find(x => x.id === id && x.category === category);
    if (found) {
      this.readerItem = found;
      this.readerOpen = true;
      document.body.style.overflow = 'hidden';
    } else {
      this.router.navigate(['/archivo'], { queryParams: { cat: this.selectedCategory } });
    }
  }

  @HostListener('window:popstate')
  onPop() {
    if (!this.route.snapshot.paramMap.get('id')) {
      document.body.style.overflow = '';
      this.readerOpen = false;
      this.readerItem = undefined;
    }
  }
}
