import { Component } from '@angular/core';
import { HeroComponent } from "../../shared/layout/hero/hero.component";
import { CrvIntroComponent } from "./section/crvIntro/crvIntro.component";
import { FvIntroComponent } from './section/fvIntro/fvIntro.component';
import { ContactSectionComponent } from "./section/contact-section/contact-section.component";

@Component({
  selector: 'app-landing',
  imports: [
    HeroComponent,
    CrvIntroComponent,
    FvIntroComponent,
    ContactSectionComponent
],
  templateUrl: './landing.component.html',
})
export class LandingComponent { }
