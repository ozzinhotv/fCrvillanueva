import { ObraGallery } from './obra-gallery.interface';

export type HeroPadding = 'pt-16' | 'pt-20' | 'pt-24';

export interface ObraData {
  category: string;
  work: string;
  hero: {
    image: string;
    title: string;
    subtitle: string;
    overlayColor: string;
    pt: HeroPadding;
  };
  introHtml: string;
  galleries: ObraGallery[];
}
