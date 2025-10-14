import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, shareReplay } from 'rxjs';
import { VidaCardInterface } from '../interfaces/vida-card.interface';

type RawVidaCard = {
  year: string;
  title: string;
  text: string;
  img?: string;
};

@Injectable({ providedIn: 'root' })
export class VidaDataService {
  private http = inject(HttpClient);

  private readonly files = [
    'assets/data/vida/period-1.json', // 1900–1928
    'assets/data/vida/period-2.json', // 1929–1940
    'assets/data/vida/period-3.json', // 1941–1949
    'assets/data/vida/period-4.json', // 1950–1958
    'assets/data/vida/period-5.json', // 1959–1969
    'assets/data/vida/period-6.json'  // 1970–1975
  ];

  private cards$?: Observable<VidaCardInterface[]>;

  getCards(): Observable<VidaCardInterface[]> {
    if (!this.cards$) {
      const reqs = this.files.map(url => this.http.get<RawVidaCard[]>(url));
      this.cards$ = forkJoin(reqs).pipe(
        map(chunks => chunks.flat()),
        // completar props que tu UI ya usa
        map(raws => raws.map((r, idx) => ({
          year: r.year,
          title: r.title ?? '',
          text: r.text ?? '',
          img: r.img,
          // defaults no disruptivos:
          placeholderColor: 'bg-red-500/20',         // puedes cambiar luego
          imageSide: (idx % 2 === 0 ? 'left' : 'right') as 'left' | 'right' // alternar lados
        }))),
        // ordenar por año de inicio para consistencia
        map(cards => cards.sort((a, b) => this.start(a.year) - this.start(b.year))),
        shareReplay(1)
      );
    }
    return this.cards$;
  }

  private start(year: string): number {
    const m = year.match(/^(\d{4})/);
    return m ? parseInt(m[1], 10) : 0;
  }
}
