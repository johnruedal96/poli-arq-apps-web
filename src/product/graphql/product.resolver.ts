import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductService } from '../application/product.service';
import { CreateProductInput } from './dto/create-product.input';
import { ProductModel } from './dto/product.model';
import { UpdateProductInput } from './dto/update-product.input';

@Resolver(() => ProductModel)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [ProductModel], { name: 'products' })
  async getProducts() {
    return this.productService.getProducts();
  }

  @Query(() => ProductModel, { name: 'product' })
  async getProduct(@Args('id', { type: () => String }) id: string) {
    return this.productService.getProduct(id);
  }

  @Mutation(() => ProductModel, { name: 'createProduct' })
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.productService.createProduct(createProductInput);
  }

  @Mutation(() => ProductModel, { name: 'updateProduct' })
  async updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    const { id, ...data } = updateProductInput;
    return this.productService.updateProduct(id, data);
  }

  @Mutation(() => Boolean, { name: 'deleteProduct' })
  async deleteProduct(@Args('id', { type: () => String }) id: string) {
    await this.productService.deleteProduct(id);
    return true;
  }
}
