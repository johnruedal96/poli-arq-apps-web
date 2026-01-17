import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateProductInput {
  @Field()
  id: string;

  @Field()
  nombre: string;

  @Field()
  descripcion: string;

  @Field()
  precio: number;
}
