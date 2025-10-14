export type ArchivoCategory = 'articulo' | 'escrito' | 'conferencia';

export interface ArchivoBase {
  id: string;
  category: ArchivoCategory;
  title: string;
  author: string;
  date: string;       // ISO 8601
  summary: string;
  contentPath: string; // ruta a .md o .pdf en assets
  coverImage?: string;
}

export interface ArchivoArticulo extends ArchivoBase { category: 'articulo'; }
export interface ArchivoEscrito  extends ArchivoBase { category: 'escrito'; }
export interface ArchivoConf     extends ArchivoBase { category: 'conferencia'; }

export type ArchivoItem = ArchivoArticulo | ArchivoEscrito | ArchivoConf;
