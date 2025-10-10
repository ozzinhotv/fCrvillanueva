import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ArchivoDataService } from './services/archivo-data.service';
import { ArchivoItem } from './interface/archivo.interface';
import { HeroComponent } from '../../shared/layout/hero/hero.component';

@Component({
  selector: 'app-archivo',
  standalone: true,
  imports: [CommonModule, HttpClientModule, HeroComponent],
  templateUrl: './archivo.component.html',
})
export class ArchivoComponent implements OnInit {
  archivos: ArchivoItem[] = [];
  visibles: ArchivoItem[] = [];
  pageSize = 6;
  currentPage = 0;
  cargando = true;

  constructor(private dataService: ArchivoDataService) {}

  ngOnInit() {
    this.dataService.getAllArchivos().subscribe((data) => {
      this.archivos = data;
      this.mostrarMas();
      this.cargando = false;
    });
  }

  mostrarMas() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.visibles = [...this.visibles, ...this.archivos.slice(start, end)];
    this.currentPage++;
  }
}
