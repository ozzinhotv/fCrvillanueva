export type GalleryCategory = 'plans' | 'construction' | 'completed';

export interface GalleryItem {
  id: string;
  title: string;
  src?: string;
  category: GalleryCategory;
  placeholder?: string;
  note?: string;
}
