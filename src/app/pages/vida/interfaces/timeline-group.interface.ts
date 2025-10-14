export interface TimelineGroup {
  label: string;         // "1900–1928"
  bgClass?: string;      // p.ej. 'bg-neutral-50' (para variar estilos por época)
  items: any[];          // luego tipamos con tu ViewModel si quieres
}
