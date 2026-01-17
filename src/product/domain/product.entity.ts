export class Product {
  id?: string;
  nombre: string;
  descripcion: string;
  precio: number;

  constructor(id: string, nombre: string, descripcion: string, precio: number) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
  }
}
