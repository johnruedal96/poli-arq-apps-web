import { Inject, Injectable } from '@nestjs/common';
import { Product } from '../domain/product.entity';
import type { ProductRepository } from '../domain/product.repository';

@Injectable()
export class ProductService {
  constructor(
    @Inject('ProductRepository')
    private readonly repo: ProductRepository,
  ) {}

  createProduct(data: Product) {
    return this.repo.create(data);
  }

  getProducts() {
    return this.repo.getAll();
  }

  getProduct(id: string) {
    return this.repo.getById(id);
  }

  updateProduct(id: string, data: Product) {
    return this.repo.update(id, data);
  }

  deleteProduct(id: string) {
    return this.repo.delete(id);
  }
}
