import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../shared/layout/hero/hero.component';
import { CrvIntroComponent } from './section/crv-intro/crv-intro.component';
import { FvIntroComponent } from './section/fv-intro/fv-intro.component';
import { ContactSectionComponent } from './section/contact-section/contact-section.component';
import { LandingDataService } from './service/landing-data.service';
import { Observable } from 'rxjs';
import { CrvIntroData, FvIntroData, ContactData } from './interface/landing.interface';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule, // async pipe
    HeroComponent,
    CrvIntroComponent,
    FvIntroComponent,
    ContactSectionComponent
  ],
  templateUrl: './landing.component.html',
})
export class LandingComponent {
  private data = inject(LandingDataService);

  crv$: Observable<CrvIntroData> = this.data.getCrvIntro();
  fv$: Observable<FvIntroData> = this.data.getFvIntro();
  contact$: Observable<ContactData> = this.data.getContact();
}
