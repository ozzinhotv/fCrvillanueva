export const NAV_INDEX: Record<string, string[]> = {
  'ciudad-universitaria': ['aula-magna', 'facultad-de-ingenieria'],
  'casas': ['caoma', 'sotavento'],
  'hospitales': ['clinica-1', 'clinica-2'],
  'museos': ['bellas-artes', 'museo-soto'],
  'sintesis-de-las-artes': ['diseno-industrial', 'paisajismo'],
  'vivienda-publica': ['23-de-enero', 'urbanizacion-el-silencio'],
};

// Etiquetas para la UI (como antes)
export const CATEGORY_LABELS: Record<string, string> = {
  'ciudad-universitaria': 'Ciudad Universitaria',
  'vivienda-publica': 'Vivienda Pública',
  'sintesis-de-las-artes': 'Síntesis de las Artes',
  'museos': 'Museos',
  'hospitales': 'Hospitales',
  'casas': 'Casas',
};

export const TITLES: Partial<Record<string, string>> = {
  'aula-magna': 'Aula Magna',
  'facultad-de-ingenieria': 'Facultad de Ingeniería',
  'caoma': 'Caoma',
  'sotavento': 'Sotavento',
  'clinica-1': 'Clínica 1',
  'clinica-2': 'Clínica 2',
  'bellas-artes': 'Museo de Bellas Artes',
  'museo-soto': 'Museo Jesús Soto',
  'diseno-industrial': 'Diseño Industrial',
  'paisajismo': 'Paisajismo',
  '23-de-enero': '23 de Enero',
  'urbanizacion-el-silencio': 'Urbanización El Silencio',
};
