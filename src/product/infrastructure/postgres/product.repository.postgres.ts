/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '../../domain/product.entity';
import { ProductRepository } from '../../domain/product.repository';
import { ProductOrmEntity } from './product.orm-entity';

@Injectable()
export class ProductRepositoryPostgres implements ProductRepository {
  constructor(
    @InjectRepository(ProductOrmEntity)
    private repo: Repository<ProductOrmEntity>,
  ) {}

  async create(
    product: Product,
  ): Promise<Product | InternalServerErrorException> {
    try {
      const entity = this.repo.create(product);
      const saved = await this.repo.save(entity);
      return new Product(
        saved.id,
        saved.nombre,
        saved.descripcion,
        saved.precio,
      );
    } catch (error) {
      throw new InternalServerErrorException('Error al crear el producto');
    }
  }

  async getAll(): Promise<Product[] | InternalServerErrorException> {
    try {
      const rows = await this.repo.find();
      return rows.map(
        (r) => new Product(r.id, r.nombre, r.descripcion, r.precio),
      );
    } catch (error) {
      throw new InternalServerErrorException('Error al consultar productos');
    }
  }

  async getById(
    id: string,
  ): Promise<Product | null | InternalServerErrorException> {
    try {
      const row = await this.repo.findOne({ where: { id } });
      if (!row) return null;
      return new Product(row.id, row.nombre, row.descripcion, row.precio);
    } catch (error) {
      throw new InternalServerErrorException('Error al consultar producto');
    }
  }

  async update(
    id: string,
    product: Product,
  ): Promise<Product | null | InternalServerErrorException> {
    try {
      await this.repo.update(id, product);
      const updated = await this.repo.findOne({ where: { id } });
      if (!updated) {
        throw new InternalServerErrorException(
          'Error al actualizar el producto, el producto no existe',
        );
      }
      return new Product(
        updated.id,
        updated.nombre,
        updated.descripcion,
        updated.precio,
      );
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async delete(id: string): Promise<void | InternalServerErrorException> {
    try {
      const deleted = await this.repo.findOne({ where: { id } });
      if (!deleted) {
        throw new InternalServerErrorException(
          'Error al eliminar el producto, el producto no existe',
        );
      }
      await this.repo.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
