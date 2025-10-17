export type GalleryCategory = 'plans' | 'construction' | 'completed';

export interface GalleryItem {
  id: string;
  title: string;
  src?: string; // image url
  category: GalleryCategory;
  placeholder?: string; // 'bg-neutral-300', etc.
  note?: string;
}
