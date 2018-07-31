export interface Libro {
  id: number;
  nombre: string;
  anio: number;
  numeroPaginas: number;
  descripcion: string;
  precio: number;
  autorId: number;
  editorialId: number;
  generoId: number;
  imagenUrl: string;
}
