import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from '../application/product.service';
import { Product } from '../domain/product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Post()
  crear(@Body() data: Product) {
    return this.service.createProduct(data);
  }

  @Get()
  listar() {
    return this.service.getProducts();
  }

  @Get(':id')
  obtener(@Param('id') id: string) {
    return this.service.getProduct(id);
  }

  @Put(':id')
  actualizar(@Param('id') id: string, @Body() data: Product) {
    return this.service.updateProduct(id, data);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.service.deleteProduct(id);
  }
}
