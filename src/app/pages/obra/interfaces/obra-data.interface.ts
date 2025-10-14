import { ObraGallery } from './obra-gallery.interface';

export type HeroPadding = 'pt-16' | 'pt-20' | 'pt-24';

export interface ObraData {
  category: string; // "Ciudad Universitaria"
  work: string;     // "Aula Magna"
  hero: {
    image: string;
    title: string;
    subtitle: string;
    overlayColor: string; // <-- REQUERIDO
    pt: HeroPadding;      // <-- REQUERIDO (no puede ser undefined)
  };
  introHtml: string;
  galleries: ObraGallery[]; // <-- AQUÍ ESTABA EL FALLO
}
