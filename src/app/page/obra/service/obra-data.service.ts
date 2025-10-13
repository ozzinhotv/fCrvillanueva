import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ObraData } from '../interfaces/obra-data.interface';

const FOLDERS: Record<string, string> = {
  'casas': 'casas',
  'ciudad-universitaria': 'ciudad-universitaria',
  'hospitales': 'hospitales',
  'museos': 'museos',
  'sintesis-de-las-artes': 'sintesis-de-las-artes',
  'vivienda-publica': 'vivienda-publica',
};

function toKebab(input: string): string {
  return input
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

function buildPath(category: string, work: string): string {
  const cat = FOLDERS[toKebab(category)];
  const obra = toKebab(work);
  if (!cat) throw new Error(`Categoría desconocida: ${category}`);
  // usamos prefijo absoluto como en “archivo”
  return `/assets/data/obra/${cat}/${obra}.json`;
}

@Injectable({ providedIn: 'root' })
export class ObraDataService {
  constructor(private http: HttpClient) {}

  /** Carga una obra desde /assets/data/obra/{categoria}/{obra}.json */
  getObra(category: string, work: string): Observable<ObraData | null> {
    const url = buildPath(category, work);
    return this.http.get<ObraData>(url).pipe(
      catchError(err => {
        console.warn(`No se pudo cargar ${url}`, err?.status || err);
        return of(null);
      })
    );
  }
}
