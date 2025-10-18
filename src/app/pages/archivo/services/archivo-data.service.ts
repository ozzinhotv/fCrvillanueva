import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ArchivoItem } from '../interface/archivo.interface';

type ArchivoManifest = {
  articulos: string[];
  escritos: string[];
  conferencias: string[];
};

@Injectable({ providedIn: 'root' })
export class ArchivoDataService {
  constructor(private http: HttpClient) {}
  getAllArchivos(): Observable<ArchivoItem[]> {
    const manifestUrl = 'assets/data/archivo/archivo.index.json';
    return this.http.get<ArchivoManifest>(manifestUrl).pipe(
      switchMap((m) => {
        const relPaths = [
          ...(m.articulos || []),
          ...(m.escritos || []),
          ...(m.conferencias || []),
        ];
        const urls = relPaths.map(p => `assets/data/archivo/${p}`);
        const requests = urls.map(url =>
          this.http.get<ArchivoItem[]>(url).pipe(
            catchError(err => {
              console.warn(`No se pudo cargar ${url}`, err?.status || err);
              return of<ArchivoItem[]>([]);
            })
          )
        );
        return forkJoin(requests).pipe(
          map(arrays => arrays.flat()),
          map(items  => this.uniqueById(items)),
          map(items  => this.shuffle(items)),
        );
      })
    );
  }
  private uniqueById(items: ArchivoItem[]): ArchivoItem[] {
    const seen = new Set<string>();
    return items.filter(it => (seen.has(it.id) ? false : (seen.add(it.id), true)));
  }
  private shuffle<T>(arr: T[]): T[] {
    return arr
      .map(item => ({ item, r: Math.random() }))
      .sort((a,b) => a.r - b.r)
      .map(x => x.item);
  }
}
