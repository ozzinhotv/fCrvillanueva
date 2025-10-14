// src/app/page/archivo/services/archivo-data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ArchivoItem } from '../interface/archivo.interface';

@Injectable({ providedIn: 'root' })
export class ArchivoDataService {
  constructor(private http: HttpClient) {}

  getAllArchivos(): Observable<ArchivoItem[]> {
    const rutas = [
      '/assets/data/archivo/articulos/encuesta_alumno.json',
      '/assets/data/archivo/escritos/templo_coloniales.json',
      '/assets/data/archivo/conferencias/reflexiones_personales.json',
    ];

    const peticiones = rutas.map((url) =>
      this.http.get<ArchivoItem[]>(url).pipe(
        catchError((err) => {
          console.warn(`No se pudo cargar ${url}:`, err?.status || err);
          return of<ArchivoItem[]>([]); // continúa con los demás
        })
      )
    );

    return forkJoin(peticiones).pipe(
      map((arrays) => arrays.flat()),
      map((items) => this.shuffle(items))
    );
  }

  private shuffle<T>(array: T[]): T[] {
    return array
      .map((item) => ({ item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item }) => item);
  }
}
