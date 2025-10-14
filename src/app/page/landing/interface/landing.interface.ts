export interface CtaData {
  label: string;
  link: string; // usaremos string y en el componente decidimos si va como routerLink
}

/** CRV Intro */
export interface CrvIntroData {
  image: string;
  alt: string;
  titleLine1: string;
  titleLine2: string;
  paragraphs: string[];
  cta: CtaData;
}

/** Fundación Intro (ajusta si tu fv-intro necesita más/menos) */
export interface FvIntroData {
  image: string;
  alt: string;
  titleLine1: string;
  titleLine2: string;
  subtitle?: string;
  paragraphs: string[];
}

/** Contact */
export type ItemType = 'list' | 'rich';
export interface ContactItem {
  title: string;
  type: ItemType;
  lines?: string[];
  text?: string;
  email?: string;
}
export interface ContactData {
  items: ContactItem[];
}
