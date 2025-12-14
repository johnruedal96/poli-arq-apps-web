import { InternalServerErrorException } from '@nestjs/common';
import { Product } from './product.entity';

export interface ProductRepository {
  create(producto: Product): Promise<Product | InternalServerErrorException>;
  getAll(): Promise<Product[] | InternalServerErrorException>;
  getById(id: string): Promise<Product | null | InternalServerErrorException>;
  update(
    id: string,
    producto: Product,
  ): Promise<Product | null | InternalServerErrorException>;
  delete(id: string): Promise<void | InternalServerErrorException>;
}
