import { ApiProperty } from '@nestjs/swagger';

export class Product {
  id: string;

  @ApiProperty()
  nombre: string;

  @ApiProperty()
  descripcion: string;

  @ApiProperty()
  precio: number;

  constructor(id: string, nombre: string, descripcion: string, precio: number) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
  }
}
