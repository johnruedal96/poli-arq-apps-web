import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field()
  nombre: string;

  @Field()
  descripcion: string;

  @Field()
  precio: number;
}
