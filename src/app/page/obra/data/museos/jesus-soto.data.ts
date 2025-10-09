import { ObraData } from '../../interfaces/obra-data.interface';

export const MUSEO_SOTO_DATA: ObraData = {
  category: 'Museos',
  work: 'Museo de Arte Moderno Jesús Soto',
  hero: {
    image: 'assets/img/hero/croquisCaoma-1.png',
    title: 'Obra',
    subtitle: 'Legado de un arquitecto',
    overlayColor: 'bg-red-600',
    pt: 'pt-24',
  },
  introHtml: `
    <p>Descripción breve de la Facultad de Ingeniería…</p>
  `,
  galleries: [
    {
      title: 'Galería principal',
      items: [
        { id: 'fi-01', title: 'Fachada',        placeholder: 'bg-neutral-300' },
        { id: 'fi-02', title: 'Patio central',  placeholder: 'bg-blue-300' },
      ],
    },
  ],
};
