import { ObraData } from '../../interfaces/obra-data.interface';

export const CAOMA_DATA: ObraData = {
  category: 'Casas',
  work: 'Caoma',
  hero: {
    image: 'assets/img/hero/croquisCaoma-1.png',
    title: 'Casas',
    subtitle: 'Caoma',
    overlayColor: 'bg-red-600', // ojo: Tailwind usa guion, no slash
    pt: 'pt-24',
  },
  introHtml: `
    <p>
      El Caoma es una pieza clave de la Ciudad Universitaria. Aquí puedes
      colocar 2–4 párrafos con el contexto histórico y decisiones de diseño.
    </p>
    <p>
      Este contenido vive en este archivo para editar rápido sin tocar código.
    </p>
  `,
  galleries: [
    {
      title: 'Galería principal',
      items: [
        { id: 'am-01', title: 'Vista general',    placeholder: 'bg-neutral-300' },
        { id: 'am-02', title: 'Auditorio',        placeholder: 'bg-red-300' },
        { id: 'am-03', title: 'Fachada',          placeholder: 'bg-blue-300' },
        { id: 'am-04', title: 'Detalle interior', placeholder: 'bg-amber-300' },
      ],
    },
  ],
};
