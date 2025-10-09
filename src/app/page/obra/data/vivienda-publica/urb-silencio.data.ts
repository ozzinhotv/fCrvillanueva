import { ObraData } from '../../interfaces/obra-data.interface';

export const EL_SILENCIO_DATA: ObraData = {
  category: 'Vivienda Pública',
  work: 'Urbanización El Silencio',
  hero: {
    image: 'assets/img/hero/croquisCaoma-1.png',
    title: 'Vivienda Pública',
    subtitle: 'Urbanización El Silencio',
    overlayColor: 'bg-red-600', // ojo: Tailwind usa guion, no slash
    pt: 'pt-24',
  },
  introHtml: `
    <p>
      El Urbanización El Silencio es una pieza clave de la Vivienda Pública. Aquí puedes
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
