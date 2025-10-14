import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { CrvIntroData, FvIntroData, ContactData } from '../interface/landing.interface';

@Injectable({ providedIn: 'root' })
export class LandingDataService {
  private http = inject(HttpClient);

  getCrvIntro(): Observable<CrvIntroData> {
    return this.http.get<CrvIntroData>('assets/data/landing/crv-intro.json');
  }

  getFvIntro(): Observable<FvIntroData> {
    return this.http.get<FvIntroData>('assets/data/landing/fv-intro.json');
  }

  getContact(): Observable<ContactData> {
    return this.http.get<ContactData>('assets/data/landing/contact.json').pipe(
      map(data => ({ items: data?.items ?? [] }))
    );
  }
}
