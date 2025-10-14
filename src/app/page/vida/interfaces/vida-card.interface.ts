export type ImageSide = 'left' | 'right';

export interface VidaCardInterface {
  year: string;
  title: string;
  text: string;
  placeholderColor: string; // seguimos soportándolo
  imageSide: ImageSide;     // seguimos soportándolo
  img?: string;             // nuevo: viene del JSON
}
