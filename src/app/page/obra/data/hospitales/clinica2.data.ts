import { ObraData } from '../../interfaces/obra-data.interface';

export const CLINICA_2_DATA: ObraData = {
  category: 'Hospitales',
  work: 'Clinica 2',
  hero: {
    image: 'assets/img/hero/croquisCaoma-1.png',
    title: 'Obra',
    subtitle: 'Legado de un arquitecto',
    overlayColor: 'bg-red-600',
    pt: 'pt-24',
  },
  introHtml: `
    <p>Descripción breve de la Clinica 2…</p>
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
