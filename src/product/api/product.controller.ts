import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ProductService } from '../application/product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductDto } from './dto/product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The created product.',
    type: ProductDto,
  })
  crear(@Body() data: CreateProductDto) {
    return this.service.createProduct(data);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of products.',
    type: [ProductDto],
  })
  listar() {
    return this.service.getProducts();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found product.',
    type: ProductDto,
  })
  obtener(@Param('id') id: string) {
    return this.service.getProduct(id);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'The updated product.',
    type: ProductDto,
  })
  actualizar(@Param('id') id: string, @Body() data: ProductDto) {
    return this.service.updateProduct(id, data);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.service.deleteProduct(id);
  }
}
