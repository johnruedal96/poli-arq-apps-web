import { Module } from '@nestjs/common';
import { ProductController } from './api/product.controller';
import { ProductService } from './application/product.service';
import { ProductResolver } from './graphql/product.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductOrmEntity } from './infrastructure/postgres/product.orm-entity';
import { ProductRepositoryPostgres } from './infrastructure/postgres/product.repository.postgres';
// import { ProductRepositoryMongo } from '../../infrastructure/product/mongo/product.repository.mongo';

@Module({
  imports: [TypeOrmModule.forFeature([ProductOrmEntity])],
  controllers: [ProductController],
  providers: [
    ProductService,
    ProductResolver,
    {
      provide: 'ProductRepository',
      useClass: ProductRepositoryPostgres,
    },
  ],
  exports: [ProductService],
})
export class ProductModule {}
