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
    'assets/data/vida/period-1.json',
    'assets/data/vida/period-2.json',
    'assets/data/vida/period-3.json',
    'assets/data/vida/period-4.json',
    'assets/data/vida/period-5.json',
    'assets/data/vida/period-6.json'
  ];

  private cards$?: Observable<VidaCardInterface[]>;

  getCards(): Observable<VidaCardInterface[]> {
    if (!this.cards$) {
      const reqs = this.files.map(url => this.http.get<RawVidaCard[]>(url));
      this.cards$ = forkJoin(reqs).pipe(
        map(chunks => chunks.flat()),
        map(raws => raws.map((r, idx) => ({
          year: r.year,
          title: r.title ?? '',
          text: r.text ?? '',
          img: r.img,
          placeholderColor: 'bg-red-500/20',
          imageSide: (idx % 2 === 0 ? 'left' : 'right') as 'left' | 'right'
        }))),
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
