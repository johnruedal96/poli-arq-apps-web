import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductModel {
  @Field()
  id: string;

  @Field()
  nombre: string;

  @Field()
  descripcion: string;

  @Field()
  precio: number;
}
