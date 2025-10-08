// src/app/page/obra/data/registry.ts
export const DATA_LOADERS: Record<string, () => Promise<any>> = {
  './data/ciudad-universitaria/aula-magna.data.ts': () =>
    import('./ciudad-universitaria/aula-magna.data'),
  './data/ciudad-universitaria/facultad-ingenieria.data.ts': () =>
    import('./ciudad-universitaria/facultad-ingenieria.data'),
  // Ejemplos:
  // './data/casas/quintacaoma.data.ts': () => import('./casas/quintacaoma.data'),
};

// ---- Índice derivado para navegación simple ----
const catRegex = /^\.\/data\/([^/]+)\/([^/]+)\.data\.ts$/;

const navIndex: Record<string, string[]> = {};
Object.keys(DATA_LOADERS).forEach((key) => {
  const m = key.match(catRegex);
  if (!m) return;
  const cat = m[1];  // e.g., 'ciudad-universitaria'
  const work = m[2]; // e.g., 'aula-magna'
  navIndex[cat] ??= [];
  if (!navIndex[cat].includes(work)) navIndex[cat].push(work);
});

// Exporta el índice para usarlo en ObraComponent
export const NAV_INDEX = navIndex;

// Marca el archivo como módulo
export {};
