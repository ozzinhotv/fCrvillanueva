// src/app/page/obra/data/registry.ts

// 1) Lista MANUAL de obras. 👇 Aquí solo agregas nuevas líneas.
export const DATA_LOADERS: Record<string, () => Promise<any>> = {

  './data/ciudad-universitaria/aula-magna.data.ts':     () => import('./ciudad-universitaria/aula-magna.data'),
  './data/ciudad-universitaria/facultad-ingenieria.data.ts': () => import('./ciudad-universitaria/facultad-ingenieria.data'),

  './data/casas/caoma.data.ts': () => import('./casas/caoma.data'),
  './data/casas/sotavento.data.ts': () => import('./casas/sotavento.data'),

  './data/hospitales/clinica1.data.ts': () => import('./hospitales/clinica1.data'),
  './data/hospitales/clinica2.data.ts': () => import('./hospitales/clinica2.data'),

  './data/museos/bellas-artes.data.ts': () => import('./museos/bellas-artes.data'),
  './data/museos/jesus-soto.data.ts': () => import('./museos/jesus-soto.data'),

  './data/sintesis-artes/paisajismo.data.ts': () => import('./sintesis-artes/paisajismo.data'),
  './data/sintesis-artes/diseno-industrial.data.ts': () => import('./sintesis-artes/diseno-industrial.data'),

  './vivienda-publica/23-enero.data.ts': () => import('./vivienda-publica/23-enero.data'),
  './vivienda-publica/urb-silencio.data.ts': () => import('./vivienda-publica/urb-silencio.data'),




  // Ejemplos:
  // './data/casas/quintacaoma.data.ts': () => import('./casas/quintacaoma.data'),
};

// 2) Derivados (NO toques de aquí hacia abajo)
const catRegex = /^\.\/data\/([^/]+)\/([^/]+)\.data\.ts$/;

const navIndex: Record<string, string[]> = {};
Object.keys(DATA_LOADERS).forEach((key) => {
  const m = key.match(catRegex);
  if (!m) return;
  const cat = m[1];   // p.ej. 'ciudad-universitaria'
  const work = m[2];  // p.ej. 'aula-magna'
  (navIndex[cat] ??= []).push(work);
});
Object.keys(navIndex).forEach(cat => navIndex[cat].sort());

// Preselección opcional por categoría (si no pones nada, usa la primera alfabética)
const CATEGORY_DEFAULTS: Partial<Record<string, string>> = {
  'ciudad-universitaria': 'aula-magna',
  'casas': 'caoma',
  'hospitales': 'clinica1',
  'museos': 'bellas-artes',
  'sintesis-artes': 'paisajismo',
  'vivienda-publica': '23-enero',
};

export function getDefaultWork(cat: string): string | null {
  const list = navIndex[cat] ?? [];
  if (!list.length) return null;
  return CATEGORY_DEFAULTS[cat] ?? list[0];
}

// Etiquetas bonitas para el navbar (puedes ajustar a gusto)
export const CATEGORY_LABELS: Record<string, string> = {
  'ciudad-universitaria': 'Ciudad Universitaria',
  'vivienda-publica': 'Vivienda Pública',
  'sintesis-artes': 'Síntesis de las Artes',
  'museos': 'Museos',
  'hospitales': 'Hospitales',
  'casas': 'Casas',
};

export const NAV_INDEX = navIndex;

// marca como módulo
export {};
